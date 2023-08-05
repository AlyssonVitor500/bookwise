import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

interface PopularBooksRaw {
  id: string
  name: string
  coverUrl: string
  authorName: string

  rating: number
}

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  if (isNaN(Number(req.query.size))) {
    return res.status(400).json({ message: 'Define a limit with param size!' })
  }

  const limit = Number(req.query.size)

  const pouplarBooksRaw: PopularBooksRaw[] = await prisma.$queryRaw`
    SELECT 
      tb.* 
    FROM (
      SELECT 
        b.id, 
        b.name,
        b.cover_url as "coverUrl",
        a.name as "authorName",
        (
          SELECT 
            SUM(ur.rating) 
          FROM  
            users_reviews ur
          WHERE ur.book_id = b.id
        ) 
          /
        (
          SELECT 
            COUNT(*)
          FROM  
            users_reviews ur
          WHERE ur.book_id = b.id
        ) as "rating"
      FROM 
        books b
      INNER JOIN authors a ON a.id = b.author_id
    ) as tb
    ORDER BY tb.rating DESC, tb.name ASC
    LIMIT ${limit}
  `

  const mostReaderBooks: PopularBooksRaw[] = pouplarBooksRaw.map((book) => {
    return {
      coverUrl: book.coverUrl,
      id: book.id,
      name: book.name,
      authorName: book.authorName,
      rating: book.rating ? Math.floor(book.rating) : 0,
    }
  })

  return res.status(200).json({ mostReaderBooks })
}
