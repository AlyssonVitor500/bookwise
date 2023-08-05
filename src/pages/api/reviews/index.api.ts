import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { buildNextAuthOptions } from '../auth/[...nextauth].api'
import { prisma } from '@/lib/prisma'

const BodySchema = z.object({
  review: z.string(),
  rating: z.number(),
  bookId: z.string(),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const { review, rating, bookId: book_id } = BodySchema.parse(req.body)

  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )

  if (!session) {
    return res.status(400).json({ message: 'You need to be logged in!' })
  }

  const objectRaw = await prisma.userReview.create({
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
    data: {
      rating,
      review,
      book_id,
      user_id: session.user.id,
    },
  })

  const data = {
    id: objectRaw.id,
    createdAt: objectRaw.created_at,
    rating: objectRaw.rating,
    userReview: objectRaw.review,

    user: {
      name: objectRaw.user.name,
      avatarUrl: objectRaw.user.avatar_url,
      email: objectRaw.user.email,
    },

    book: {
      coverUrl: objectRaw.book.cover_url,
      name: objectRaw.book.name,
      authorName: objectRaw.book.author.name,
    },
  }

  return res.status(201).json({ ...data })
}
