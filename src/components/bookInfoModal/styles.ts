import { keyframes, styled } from '@/lib/stitches'

const simpleFadeIn = keyframes({
  from: {
    opacity: 0,
  },

  to: {
    opacity: 1,
  },
})

export const BookInfoPortal = styled('div', {})

export const BookInfoOverlay = styled('div', {
  background: 'rgba(0 0 0 / 0.5)',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 9999996,
})

export const BookInfoContent = styled('div', {
  animation: `${simpleFadeIn} .3s ease-in-out`,

  backgroundColor: '$gray800',
  boxShadow: '-4px 0px 30px 0px rgba(0, 0, 0, 0.50)',
  maxWidth: 660,
  width: '100%',
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  zIndex: 9999997,
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  padding: '24px 48px',

  '& > header': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    color: '$gray400',

    '& > button': {
      all: 'unset',
      cursor: 'pointer',

      '&:hover': {
        transition: '.2s',
        opacity: 0.8,
      },
    },
  },

  overflowY: 'auto',

  '&::-webkit-scrollbar': {
    width: 6,
  },

  '&::-webkit-scrollbar-track': {
    backgroundColor: '$gray700',
    borderRadius: '$full',
  },

  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '$gray600',
    borderRadius: '$full',
  },
})

export const BookInfoMainContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 40,
})

export const BookInfoSession = styled('div', {
  background: '$gray700',
  width: '100%',
  padding: '24px 32px 16px',
  borderRadius: '$lg',

  display: 'flex',
  flexDirection: 'column',
  gap: 40,
})

export const BookInfoHeader = styled('div', {
  display: 'flex',
  gap: 32,

  '& > div': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',

    '& > div:first-child': {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,

      'span:first-child': {
        fontSize: '$lg',
        fontWeight: '$bold',
        lineHeight: '$shorter',
        color: '$gray100',
      },

      'span:last-child': {
        fontSize: '$md',
        lineHeight: '$base',
        color: '$gray300',
      },
    },

    '& > div:last-child': {
      display: 'flex',
      flexDirection: 'column',

      '& > div': {
        display: 'flex',
        gap: 4,
      },

      '& > span': {
        color: '$gray400',
        lineHeight: '$base',
      },
    },
  },
})

export const BookInfoDetails = styled('div', {
  display: 'grid',
  gridTemplateColumns: '216px 1fr',
  gap: 56,
  padding: '24px 0',
  borderTop: '1px solid $colors$gray600',

  '& > div': {
    display: 'flex',
    gap: 16,
    alignItems: 'center',

    '& > svg': {
      color: '$green100',
    },

    '& > div': {
      display: 'flex',
      flexDirection: 'column',

      '& > span:first-child': {
        color: '$gray300',
        lineHeight: '$base',
      },

      '& > span:last-child': {
        color: '$gray200',
        lineHeight: '$shorter',
        fontWeight: '$bold',
        wordWrap: 'break-word',
      },
    },
  },
})

export const BookReviews = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 16,

  '& > header': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: '$gray200',
    lineHeight: '$base',
  },

  '& > main': {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
})

export const CenterItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
})

export const UserReviewForm = styled('form', {
  padding: 24,
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  background: '$gray700',
  borderRadius: '$md',

  '& > header': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    '& > div:first-child': {
      display: 'flex',
      alignItems: 'center',
      gap: 16,

      fontSize: '$md',
      fontWeight: '$bold',
      lineHeight: '$shorter',
    },

    '& > div:last-child': {
      display: 'flex',
      gap: 3,

      '& > svg': {
        fontSize: 24,
      },
    },
  },

  '& > main': {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
})

export const UserReviewTextArea = styled('textarea', {
  all: 'unset',
  width: '100%',
  height: 164,
  resize: 'none',
  borderRadius: '$xs',
  padding: '14px 20px',
  boxSizing: 'border-box',
  color: '$gray200',
  lineHeight: '$base',
  background: '$gray800',
  transition: '.2s',
  outline: '1px solid transparent',

  '&:hover, &:focus': {
    outline: '1px solid $colors$green200',
  },
})

export const UserReviewTextAreaError = styled('span', {
  fontWeight: '$bold',
  color: '$red500',
  lineHeight: '$shorter',
})

export const UserReviewButtonActionGroup = styled('div', {
  display: 'flex',
  gap: 8,
  alignContent: 'center',
  justifyContent: 'flex-end',
})

export const UserActionButton = styled('button', {
  all: 'unset',

  padding: 8,
  background: '$gray600',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  borderRadius: '$xs',
  transition: '.2s',

  '&:disabled': {
    cursor: 'not-allowed',
  },

  '&:not(:disabled):hover': {
    background: '$gray500',
  },

  variants: {
    iconColor: {
      purple: {
        color: '$purple100',
      },
      green: {
        color: '$green100',
      },
    },
  },
})
