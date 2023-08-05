import { styled } from '@/lib/stitches'

export const UserReviewCardContainer = styled('div', {
  width: '100%',
  padding: 24,
  display: 'flex',
  flexDirection: 'column',
  gap: 24,

  backgroundColor: '$gray700',
  borderRadius: '$md',

  '& > header': {
    display: 'flex',
    gap: 24,
  },

  '& > main': {
    lineHeight: '$base',
    color: '$gray300',
    whiteSpace: 'pre-wrap',
  },
})

export const BookInfoAside = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',

  '& > div:first-child': {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,

    '& > span:first-child': {
      fontSize: '$lg',
      color: '$gray100',
      fontWeight: '$bold',
      lineHeight: '$shorter',
    },

    '& > span:last-child': {
      color: '$gray400',
      lineHeight: '$base',
    },
  },

  '& > div:last-child': {
    display: 'flex',
    gap: 4,
  },
})
