import { styled } from '@/lib/stitches'
import { Star as StarPhosphorReact } from '@phosphor-icons/react'

export const Star = styled(StarPhosphorReact, {
  color: '$purple100',

  variants: {
    canPress: {
      true: {
        cursor: 'pointer',

        '&:hover': {
          opacity: 0.8,
        },
      },
    },
    size: {
      md: { fontSize: 20 },
      sm: { fontSize: 16 },
    },
  },

  defaultVariants: {
    size: 'sm',
    canPress: 'true',
  },
})
