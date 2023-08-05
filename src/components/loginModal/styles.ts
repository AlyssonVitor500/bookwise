import { keyframes, styled } from '@/lib/stitches'

const simpleFadeIn = keyframes({
  from: {
    opacity: 0,
  },

  to: {
    opacity: 1,
  },
})

export const LoginPortal = styled('div', {})

export const LoginOverlay = styled('div', {
  background: 'rgba(0 0 0 / 0.5)',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 99999998,
})

export const LoginContent = styled('div', {
  animation: `${simpleFadeIn} .3s ease-in-out`,

  backgroundColor: '$gray700',
  boxShadow: '4px 16px 24px 0px rgba(0, 0, 0, 0.25)',
  maxWidth: 516,
  width: '100%',
  zIndex: 99999999,
  borderRadius: '$lg',

  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  display: 'flex',
  flexDirection: 'column',
  gap: 16,

  padding: '16px 16px 56px',

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

  '& > main': {
    maxWidth: 372,
    width: '100%',
    margin: '0 auto 0',

    display: 'flex',
    flexDirection: 'column',
    gap: 40,

    '& > span': {
      textAlign: 'center',
      fontSize: '$md',
      fontWeight: '$bold',
      lineHeight: '$shorter',
      color: '$gray200',
    },

    '& > div': {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
    },
  },
})

export const LoginButton = styled('button', {
  all: 'unset',
  backgroundColor: '$gray600',
  color: '$gray200',
  borderRadius: '$md',
  cursor: 'pointer',
  width: '100%',
  padding: '20px 24px',
  boxSizing: 'border-box',
  fontSize: '$lg',
  fontWeight: '$bold',
  lineHeight: '$base',

  '&:hover': {
    opacity: 0.8,
    transition: '.2s ease-out',
  },

  display: 'flex',
  gap: 20,
  alignItems: 'center',
})
