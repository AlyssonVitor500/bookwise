import { globalCss } from '.'

export const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },

  body: {
    backgroundColor: '$gray800',
    color: '$gray300',
    '-webkit-font-smoothing': 'antia lised',
    fontSmooth: 'always',
    fontSize: '$sm',
  },

  'body, input, textarea, button': {
    fontFamily: '$default',
    fontWeight: '$regular',
  },
})
