import { styled } from '@/lib/stitches'

export const MiniBookCardContainer = styled('div', {
  padding: '16px 18px',
  backgroundColor: '$gray700',
  transition: '.2s',
  position: 'relative',
  overflow: 'hidden',

  maxHeight: 184,

  display: 'flex',
  gap: 20,
  borderRadius: '$md',
  cursor: 'pointer',

  border: '2px solid $colors$gray700',

  '&:hover': {
    border: '2px solid $colors$gray600',
  },

  '& > main': {
    display: 'flex',
    padding: 5,
    flexDirection: 'column',
    justifyContent: 'space-between',
    zIndex: 100,

    '& > header': {
      display: 'flex',
      flexDirection: 'column',

      'span:first-child': {
        color: '$gray100',
        fontSize: '$md',
        fontWeight: '$bold',
        lineHeight: '$shorter',
      },

      'span:last-child': {
        color: '$gray400',
        lineHeight: '$base',
      },
    },
  },
})

export const StarRatingGroup = styled('div', {
  display: 'flex',
  gap: 4,
})

export const AlreadyReadLabel = styled('div', {
  position: 'absolute',
  top: 0,
  right: 0,

  width: 53,
  height: 24,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '$green100',
  fontWeight: '$bold',

  background: '$green300',
  borderBottomLeftRadius: '$xs',
  boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.50)',
})
