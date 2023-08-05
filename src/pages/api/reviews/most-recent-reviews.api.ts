import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

type idsToSearch = {
  id: string
}

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  if (
    (req.query.size && isNaN(Number(req.query.size))) ||
    (req.query.page && isNaN(Number(req.query.page)))
  ) {
    return res.status(400).json({ message: 'Define the pagination in number!' })
  }

  const page = req.query.size ? Number(req.query.page) : null
  const size = req.query.size ? Number(req.query.size) : null
  const bookId = req.query.bookId ? String(req.query.bookId) : '%%'
  const userId = req.query.userId ? String(req.query.userId) : '%%'
  const bookName = req.query.bookName
    ? '%'.concat(String(req.query.bookName).toUpperCase()).concat('%')
    : '%%'

  const isPageAndSizeNotNull = page != null && size != null

  const idsToSearch: idsToSearch[] = await prisma.$queryRaw`

    SELECT
      ur.id
    FROM
      users_reviews ur
    INNER JOIN
      books b on ur.book_id = b.id
    WHERE
      user_id LIKE ${userId}
      AND
      book_id LIKE ${bookId}
      AND
      upper(b.name) LIKE upper(${bookName})

    ORDER BY ur.created_at DESC

    ${size ? Prisma.sql`LIMIT ${size}` : Prisma.sql``}
    ${isPageAndSizeNotNull ? Prisma.sql`OFFSET ${page * size}` : Prisma.sql``}

  `

  const mostRecentReviews = await prisma.userReview.findMany({
    select: {
      id: true,
      rating: true,
      review: true,
      created_at: true,

      book: {
        select: {
          cover_url: true,
          name: true,

          author: {
            select: {
              name: true,
            },
          },
        },
      },

      user: {
        select: {
          avatar_url: true,
          name: true,
          email: true,
        },
      },
    },

    where: {
      id: {
        in: idsToSearch.map((item) => item.id),
      },
    },

    orderBy: {
      created_at: 'desc',
    },
  })

  let nextPageData: idsToSearch[] = []

  if (isPageAndSizeNotNull) {
    nextPageData = await prisma.$queryRaw`

      SELECT
        ur.id
      FROM
        users_reviews ur
      INNER JOIN
        books b on ur.book_id = b.id
      WHERE
        user_id LIKE ${userId}
        AND
        book_id LIKE ${bookId}
        AND
        upper(b.name) LIKE ${bookName}

      ORDER BY ur.created_at DESC

      ${size ? Prisma.sql`LIMIT ${size}` : Prisma.sql``}
      ${
        isPageAndSizeNotNull
          ? Prisma.sql`OFFSET ${(page + 1) * size}`
          : Prisma.sql``
      }

    `
  }

  const data = mostRecentReviews.map((review) => {
    return {
      id: review.id,
      createdAt: review.created_at,
      rating: review.rating,
      userReview: review.review,

      user: {
        name: review.user.name,
        avatarUrl: review.user.avatar_url,
        email: review.user.email,
      },

      book: {
        coverUrl: review.book.cover_url,
        name: review.book.name,
        authorName: review.book.author.name,
      },
    }
  })

  return res.status(200).json({
    data,
    size,
    page,
    lastPage: isPageAndSizeNotNull ? nextPageData.length === 0 : null,
  })
}
