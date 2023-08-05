import { keyframes, styled } from '@/lib/stitches'
import sideBarBackground from '@/../public/sideBarBackground.png'

export const Container = styled('div', {
  width: '100%',
  maxWidth: 232,
  marginTop: 0,
  marginBottom: 0,
  height: 926,
  backgroundImage: `url(${sideBarBackground.src})`,
  backgroundRepeat: 'repeat',

  borderRadius: '$lg',
  display: 'flex',
  gap: 73,
  flexDirection: 'column',

  '& > *': {
    margin: '0 auto',
  },

  padding: '40px 0 24px',
})

export const MenuButtonGroup = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
})

const borderAppearing = keyframes({
  from: { height: 0 },
  to: { height: 24 },
})

export const MenuButton = styled('button', {
  all: 'unset',
  display: 'flex',
  gap: 12,
  width: 'fit-content',
  padding: '8px 0',

  fontWeight: '$bold',
  fontSize: '$md',
  lineHeight: '$base',

  color: '$gray400',
  cursor: 'pointer',
  transition: '.2s',

  '&:hover': {
    color: '$gray100',
  },

  variants: {
    active: {
      true: {
        color: '$gray100',
        position: 'relative',

        '&::before': {
          content: '',
          position: 'absolute',
          // height: 24,
          width: 4,
          backgroundColor: 'red',

          animation: `${borderAppearing} .15s ease-out forwards`,

          top: 9,
          left: -20,
          background: 'linear-gradient(180deg, #7FD1CC 0%, #9694F5 100%)',
          borderRadius: '$sm',
        },
      },
    },
  },
})

export const UserSessionButton = styled('button', {
  all: 'unset',
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  lineHeight: '$base',
  width: 'fit-content',
  margin: '0 auto',
  cursor: 'pointer',

  '&:hover': {
    opacity: 0.9,
  },

  variants: {
    isSessionActive: {
      false: {
        [`> svg`]: { color: '$green100' },
        '&> span': {
          color: '$gray200',
          fontWeight: '$bold',
          fontSize: '$md',
        },
      },
      true: {
        [`> svg`]: { color: '$red500' },
        '&> span': {
          color: '$gray200',
          fontWeight: '$bold',
          fontSize: '$sm',
        },
      },
    },
  },

  defaultVariants: {
    isSessionActive: false,
  },
})
