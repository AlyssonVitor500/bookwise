import { styled } from '@/lib/stitches'

export const ButtonContainer = styled('button', {
  all: 'unset',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '4px 8px',
  borderRadius: '$xs',

  lineHeight: '$base',
  fontWeight: '$bold',

  '&:not(:disabled)': {
    cursor: 'pointer',
  },

  '&:not(:disabled):hover': {
    transition: '0.2s',
  },

  variants: {
    variant: {
      purple: {
        color: '$purple100',

        '&:not(:disabled):hover': {
          backgroundColor: 'rgba(131, 129, 217, 0.06)',
        },
      },
      white: {
        color: '$gray200',

        '&:not(:disabled):hover': {
          backgroundColor: 'rgba(230, 232, 242, 0.04)',
        },
      },
    },

    size: {
      md: {
        gap: 12,
        fontSize: '$md',
      },

      sm: {
        gap: 8,
        fontSize: '$sm',
      },
    },
  },

  defaultVariants: {
    variant: 'purple',
    size: 'md',
  },
})
