import { styled } from '@/lib/stitches'

export const InputTextDiv = styled('label', {
  display: 'flex',
  gap: 8,
  padding: '14px 20px',
  borderRadius: '$xs',
  border: '1px solid $colors$gray500',
  cursor: 'text',

  width: '100%',

  '& > button': {
    all: 'unset',
    color: '$gray500',
    cursor: 'pointer',

    display: 'flex',
    justifyItems: 'center',
    alignItems: 'center',
  },

  '&:has(input:focus), &:has(input:not(:disabled):hover)': {
    transition: '.2s',
    borderColor: '$green200',

    '& > button': {
      color: '$green200',
      transition: '.2s',
    },
  },

  variants: {
    inputWithoutMaxWidth: {
      false: { maxWidth: 307 },
    },
  },

  defaultVariants: {
    inputWithoutMaxWidth: 'false',
  },
})

export const InputTextComponent = styled('input', {
  all: 'unset',
  flex: 1,
  lineHeight: '$base',

  '&::placeholder': {
    color: '$gray400',
    lineHeight: '$base',
    fontFamily: '$default',
  },

  color: '$gray200',
})
