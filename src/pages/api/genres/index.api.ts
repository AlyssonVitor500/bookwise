import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const allGenres = await prisma.genre.findMany({
    select: {
      id: true,
      name: true,
    },

    orderBy: {
      name: 'asc',
    },
  })

  return res.status(200).json({ genres: allGenres })
}
