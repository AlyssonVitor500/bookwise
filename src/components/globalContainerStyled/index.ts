import { styled } from '@/lib/stitches'

export const DefaultMainContainer = styled('div', {
  padding: '0 20px',
  maxWidth: 1440,
  width: '100%',

  display: 'grid',
  gridTemplateColumns: '232px 1fr',
  justifyContent: 'flex-start',
  height: '85vh',
  gap: 98,

  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
})
