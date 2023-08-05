import { styled } from '@/lib/stitches'

export const ProfileMainContainer = styled('div', {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: 40,
  paddingTop: 72,

  '& > header.own-profile': {
    display: 'flex',
    alignItems: 'center',
    gap: 12,

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
    gridTemplateColumns: '1fr 308px',
    alignItems: 'flex-start',

    gap: 64,
  },
})

export const UserReviewsContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 32,

  overflowY: 'scroll',
  height: 'calc(((100vh - 85vh) / 2) + 70vh)',
  paddingRight: 10,
  paddingBottom: 20,

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
})

export const UserReviewOrderByDate = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
})

export const UserDetails = styled('div', {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: 32,
  borderLeft: '1px solid $gray700',

  '& > header': {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,

    '& > div': {
      display: 'flex',
      flexDirection: 'column',
      alignSelf: 'center',
      textAlign: 'center',

      '& > span:first-child': {
        fontWeight: '$bold',
        lineHeight: '$shorter',
        fontSize: '$xl',
        color: '$gray100',
      },

      '& > span:last-child': {
        lineHeight: '$base',
        color: '$gray400',
      },
    },
  },

  '& > main': {
    padding: '20px 56px',

    display: 'flex',
    flexDirection: 'column',
    gap: 40,
  },
})

export const Separtor = styled('div', {
  height: 4,
  background: 'linear-gradient(90deg, #7FD1CC 0%, #9694F5 100%)',
  borderRadius: '$full',
  width: 32,
  alignSelf: 'center',
})

export const ReaderAnalytics = styled('div', {
  display: 'flex',
  gap: 20,

  svg: {
    color: '$green100',
  },

  '& > div': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',

    '& > span:first-child': {
      color: '$gray200',
      fontSize: '$md',
      fontWeight: '$bold',
      lineHeight: '$shorter',
    },

    '& > span:last-child': {
      color: '$gray300',
      lineHeight: '$base',
    },
  },
})
