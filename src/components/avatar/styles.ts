import { styled } from '@/lib/stitches'
import { Root, Fallback, Image } from '@radix-ui/react-avatar'

export const AvatarFallback = styled(Fallback, {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

export const AvatarImage = styled(Image, {
  borderRadius: '$full',
  width: '100%',
})

export const AvatarRoot = styled(Root, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 'inherit',

  height: 'inherit',
  width: 'inherit',

  [`&:has(${AvatarFallback})`]: {
    backgroundColor: '$gray700',
  },
})

export const AvatarContainer = styled('div', {
  boxSizing: 'content-box',
  padding: 1,
  borderRadius: '$full',
  overflow: 'hidden',
  background: 'linear-gradient(180deg, #7FD1CC 0%, #9694F5 100%)',

  variants: {
    size: {
      md: {
        width: 40,
        height: 40,
      },
      sm: {
        width: 32,
        height: 32,
      },
      lg: {
        width: 72,
        height: 72,
      },
    },

    userCanClick: {
      true: {
        cursor: 'pointer',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})
