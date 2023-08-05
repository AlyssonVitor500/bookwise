import { styled } from '@/lib/stitches'

export const TagContainer = styled('span', {
  padding: '4px 16px',
  borderRadius: '$full',
  cursor: 'pointer',
  color: '$purple100',

  border: '1px solid $purple100',

  variants: {
    selected: {
      true: {
        borderColor: '$purple200',
        backgroundColor: '$purple200',
        color: '$gray100',
        transition: '.2s',
      },

      false: {
        '&:hover': {
          backgroundColor: '$purple200',
          borderColor: '$purple100',
          color: '$gray100',
          transition: '.2s',
        },
      },
    },
  },

  defaultVariants: {
    selected: 'false',
  },
})
