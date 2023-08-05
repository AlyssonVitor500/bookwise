import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { buildNextAuthOptions } from '../auth/[...nextauth].api'
import { Prisma } from '@prisma/client'

interface Book {
  id: string
  name: string
  coverUrl: string
  authorName: string
  rating: number
  bookAlreadyRead: number
}

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )

  const userId = session?.user.id

  const bookName = req.query.bookName
    ? '%'.concat(String(req.query.bookName).toUpperCase()).concat('%')
    : '%%'

  const genreId = req.query.genre ?? undefined

  const books: Book[] = await prisma.$queryRaw`
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
      ) as "rating",
      
      CASE 
        WHEN 
          (SELECT COUNT(*) FROM users_reviews ur WHERE ur.book_id = b.id AND ur.user_id = ${userId}) > 0 THEN 1 ELSE 0
      END as "bookAlreadyRead"
    FROM books b
    INNER JOIN authors a ON a.id = b.author_id
    WHERE 

    UPPER(b.name) LIKE ${bookName}

    ${
      genreId
        ? Prisma.sql`
            AND 
              EXISTS 
                (SELECT 1 FROM books_genres bg WHERE bg.genre_id = ${genreId} and bg.book_id = b.id)`
        : Prisma.sql``
    }

    ORDER BY b.name ASC
  `

  const returnedBooks = books.map((book) => {
    return {
      id: book.id,
      name: book.name,
      cover_url: book.coverUrl,
      author_name: book.authorName,
      starsAmount: book.rating ? Math.floor(book.rating) : 0,
      bookAlreadyRead: Number(book.bookAlreadyRead) === 1,
    }
  })

  res.status(200).json({ books: returnedBooks })
}
