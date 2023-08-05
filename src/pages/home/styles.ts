import { styled } from '@/lib/stitches'

export const Container = styled('div', {
  maxWidth: 1440,
  width: '100%',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  padding: '1rem',

  display: 'flex',
  alignItems: 'center',
  gap: '2rem',

  '> img': {
    '@media(max-width: 950px)': {
      display: 'none',
    },
  },
})

export const WelcomeContainer = styled('div', {
  margin: '0 auto 0',
  display: 'flex',
  flexDirection: 'column',
  gap: 40,

  maxWidth: 372,
  width: '100%',
})

export const WelcomeContainerHeader = styled('div', {
  h2: {
    fontSize: '$2xl',
    fontWeight: '$bold',
    lineHeight: '$shorter',
    color: '$gray100',
  },

  span: {
    fontSize: '$md',
    color: '$gray200',
    lineHeight: '$base',
  },
})

export const WelcomeContainerButtonGroup = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
})

export const WelcomeContainerButton = styled('button', {
  all: 'unset',
  backgroundColor: '$gray600',
  color: '$gray200',
  padding: '20px 24px',
  borderRadius: '$md',
  cursor: 'pointer',

  '&:hover': {
    opacity: 0.8,
    transition: '.2s ease-out',
  },

  display: 'flex',
  gap: 20,
  alignItems: 'center',
})
