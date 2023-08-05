import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'

const UserEmailSchema = z.object({
  email: z
    .string()
    .email({ message: 'Please, verify the email adress and try again!' }),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  try {
    const { email } = UserEmailSchema.parse(req.query)

    const user = await prisma.user.findUnique({
      where: {
        email,
      },

      include: {
        UserReview: {
          select: {
            id: true,
          },
        },
      },
    })

    if (!user) {
      return res.status(200).json(null)
    }

    const { numberOfReadPages }: any = await prisma.$queryRaw`
      SELECT SUM(b.pages_number) as numeberOfReadPages
      FROM 
        users_reviews ur
      INNER JOIN books b on b.id = ur.book_id
      WHERE
        ur.user_id = ${user.id}
    `

    const evaluatedBooksAmount = user.UserReview?.length

    const { numberOfAuthorsRead }: any = await prisma.$queryRaw`
      SELECT SUM(t.singleAuthorReadCount) as numberOfAuthorsRead from 
      (
        SELECT b.author_id, COUNT(*) as singleAuthorReadCount
        FROM 
          users_reviews ur
        INNER JOIN books b on b.id = ur.book_id
        WHERE
          ur.user_id = ${user.id}
        GROUP BY b.author_id
      ) as t
    `

    return res.json({
      user,
      statics: {
        numberOfReadPages: numberOfReadPages ?? 0,
        evaluatedBooksAmount: evaluatedBooksAmount ?? 0,
        numberOfAuthorsRead: numberOfAuthorsRead ?? 0,
      },
    })
  } catch (e: any) {
    const hasAnInssue = e?.issues && e?.issues instanceof Array
    if (hasAnInssue && e.issues[0].message) {
      const message = e.issues[0].message
      return res.status(400).json({ message })
    }

    return res
      .status(400)
      .json({ message: 'An error occurred, try again later!' })
  }
}

export async function getUserWithServerSideProps(userEmail: string) {
  try {
    const { email } = UserEmailSchema.parse({ email: userEmail })

    const user = await prisma.user.findUnique({
      where: {
        email,
      },

      include: {
        UserReview: {
          select: {
            id: true,
          },
        },
      },
    })

    if (!user) {
      return { status: 400, body: null }
    }

    const [{ numberOfReadPages }]: any = await prisma.$queryRaw`
      SELECT SUM(b.pages_number) as "numberOfReadPages"
      FROM 
        users_reviews ur
      INNER JOIN books b on b.id = ur.book_id
      WHERE
        ur.user_id = ${user.id}
      LIMIT 1
    `

    const evaluatedBooksAmount = user.UserReview?.length

    const [{ numberOfAuthorsRead }]: any = await prisma.$queryRaw`
      SELECT SUM(t.singleAuthorReadCount) as numberOfAuthorsRead from 
      (
        SELECT b.author_id, COUNT(*) as singleAuthorReadCount
        FROM 
          users_reviews ur
        INNER JOIN books b on b.id = ur.book_id
        WHERE
          ur.user_id = ${user.id}
        GROUP BY b.author_id
      ) as t
      LIMIT 1
    `

    const [mostReadGenreQuery]: any = await prisma.$queryRaw`
      SELECT t.name as mostReadGenre from 
      (
        SELECT g.name, COUNT(*) as qtd 
        FROM 
          users_reviews ur
        INNER JOIN books b on b.id = ur.book_id
        INNER JOIN books_genres bg on bg.book_id = b.id
        INNER JOIN genres g on g.id = bg.genre_id
        WHERE
          ur.user_id = ${user.id}
        GROUP BY g.name
        ORDER BY g.name asc
      ) as t
      ORDER BY t.qtd desc 
      LIMIT 1
  `
    const mostReadGenre = mostReadGenreQuery
      ? mostReadGenreQuery.mostReadGenre
      : null

    return {
      body: {
        user: {
          ...user,
          created_at: user.created_at.toISOString(),
        },
        statics: {
          numberOfReadPages: numberOfReadPages
            ? Math.floor(numberOfReadPages)
            : 0,
          evaluatedBooksAmount,
          numberOfAuthorsRead: numberOfAuthorsRead
            ? Math.floor(numberOfAuthorsRead)
            : 0,
          mostReadGenre: mostReadGenre ?? 'Ainda não possui.',
        },
      },
      status: 200,
    }
  } catch (e: any) {
    const hasAnInssue = e?.issues && e?.issues instanceof Array
    if (hasAnInssue && e.issues[0].message) {
      const message = e.issues[0].message
      return { message, status: 400 }
    }

    return { message: 'An error occurred, try again later!', status: 400 }
  }
}
