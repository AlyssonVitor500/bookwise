import { styled } from '@/lib/stitches'
import { Avatar } from '../avatar'

export const BookCardContainer = styled('div', {
  padding: 24,
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  borderRadius: '$md',

  gap: 32,

  '& > header': {
    display: 'flex',
    justifyContent: 'space-between',
  },

  '& > main': {
    display: 'flex',
    gap: 20,
  },

  variants: {
    isOwnReview: {
      true: {
        backgroundColor: '$gray600',
      },
      false: {
        backgroundColor: '$gray700',
      },
    },
  },

  defaultVariants: {
    isOwnReview: 'false',
  },
})

export const ReviewerDetails = styled('div', {
  display: 'flex',
  gap: 16,

  '& > div': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',

    lineHeight: '$base',

    'span:nth-child(1)': {
      fontSize: '$md',
      color: '$gray100',
    },

    'span:nth-child(2)': {
      color: '$gray400',
    },
  },
})

export const ReviewRating = styled('div', {
  display: 'flex',
  gap: 2,
})

export const BookReviewDescriber = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 24,

  '& > div:first-child': {
    display: 'flex',
    flexDirection: 'column',

    '& > span:first-child': {
      lineHeight: '$shorter',
      fontWeight: '$bold',
      color: '$gray100',
      fontSize: '$md',
    },

    '& > span:last-child': {
      lineHeight: '$base',
      color: '$gray400',
    },
  },
})

export const ReviewText = styled('div', {
  lineHeight: '$base',
  color: '$gray300',

  '& > span': {
    color: '$purple100',
    fontWeight: '$bold',
    cursor: 'pointer',
  },
})
