import { styled } from '@/lib/stitches'
import { ArrowUp } from '@phosphor-icons/react'

export const FeedTitleSpan = styled('span', {
  color: '$gray100',
  lineHeight: '$base',
})

export const MainContainer = styled('div', {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: 40,

  '& > header': {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginTop: 72,

    span: {
      color: '$gray100',
      fontWeight: '$bold',
      lineHeight: '$shorter',
      fontSize: '$2xl',
    },

    svg: {
      color: '$green100',
    },
  },

  '& > main': {
    display: 'grid',
    gridTemplateColumns: '1fr 300px',

    gap: 64,
  },
})

export const RecentReviews = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  scrollBehavior: 'smooth',

  height: 'calc(((100vh - 85vh) / 2) + 70vh)',
  overflowY: 'scroll',
  borderRadius: '$md',
  paddingRight: 10,
  paddingBottom: 20,

  [`& > ${FeedTitleSpan}`]: {
    position: 'sticky',
    top: -2,
    backgroundColor: '$gray800',
    boxSizing: 'content-box',
    paddingBottom: 5,

    display: 'flex',
    alignItems: 'center',
  },

  '&::-webkit-scrollbar': {
    width: 3,
  },

  '&::-webkit-scrollbar-track': {
    backgroundColor: '$gray800',
    borderRadius: '$full',
  },

  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '$gray700',
    borderRadius: '$full',
  },

  '& div.infinite-scroll-component': {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
})

export const PopularBooksSession = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 16,

  '& > header': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    a: {
      all: 'unset',
    },
  },

  '& > main': {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
})
