import { styled } from '@/lib/stitches'

export const ExplorerContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 40,
  maxWidth: 1100,

  '& > header': {
    marginTop: 72,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  '& > main': {
    display: 'flex',
    flexDirection: 'column',
    gap: 48,
  },
})

export const ExplorerHeaderText = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: 12,

  '& > span': {
    fontWeight: '$bold',
    fontSize: '$2xl',
    lineHeight: '$shorter',
    color: '$gray100',
  },

  '& > svg': {
    color: '$green100',
  },
})

export const TagsGroup = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  flexWrap: 'wrap',
  maxHeight: 30,
  overflowY: 'auto',
  paddingRight: 7,

  '& > span': {
    flexShrink: 0,
  },

  '&::-webkit-scrollbar': {
    width: 3,
  },

  '&::-webkit-scrollbar-track': {
    backgroundColor: '$gray800',
    borderRadius: '$full',
  },

  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '$purple100',
    borderRadius: '$full',
  },
})

export const BooksGroup = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minMax(300px, 1fr))',
  justifyContent: 'center',
  gap: 20,

  maxHeight: 'calc(((100vh - 85vh) / 2) + 60.5vh)',
  paddingRight: 10,
  paddingBottom: 20,
  overflowY: 'auto',

  '&::-webkit-scrollbar': {
    width: 3,
  },

  '&::-webkit-scrollbar-track': {
    backgroundColor: '$gray800',
    borderRadius: '$full',
  },

  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '$gray700',
    borderRadius: '$full',
  },
})
