import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { buildNextAuthOptions } from '../auth/[...nextauth].api'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const bookId = req.query.bookId

  const book = await prisma.book.findUnique({
    select: {
      id: true,
      name: true,
      cover_url: true,
      pages_number: true,

      UserReview: {
        select: { rating: true, user_id: true },
      },

      BookGenre: {
        select: {
          genre: {
            select: {
              name: true,
            },
          },
        },
      },

      author: {
        select: {
          name: true,
        },
      },
    },

    where: {
      id: String(bookId),
    },
  })

  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )

  if (!book) {
    return res.status(400).json({ message: 'Book not found!' })
  }

  const bookTotalRating = {
    totalReviews: book.UserReview.length,
    starsSum: book.UserReview.reduce((acc, userReview) => {
      acc = acc + userReview.rating
      return acc
    }, 0),
  }

  const starsAmount = Math.floor(
    bookTotalRating!.starsSum / bookTotalRating!.totalReviews,
  )

  const bookAlreadyRead = session
    ? book.UserReview.findIndex((ur) => ur.user_id === session.user.id) !== -1
    : false

  const returnedBook = {
    id: book.id,
    name: book.name,
    coverUrl: book.cover_url,
    authorName: book.author.name,
    genres: book.BookGenre.map((bookGenre) => bookGenre.genre.name),
    totalOfPages: book.pages_number,
    starsAmount: isNaN(starsAmount) ? 0 : starsAmount,
    totalOfReviews: bookTotalRating.totalReviews,
    bookAlreadyRead,
  }

  res.status(200).json({ ...returnedBook })
}
