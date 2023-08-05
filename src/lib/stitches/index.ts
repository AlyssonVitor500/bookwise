import {
  colors,
  fontSizes,
  fontWeights,
  fonts,
  lineHeights,
  radii,
} from '@/tokens/tokens-data'
import { createStitches } from '@stitches/react'

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors,
    fontSizes,
    fontWeights,
    fonts,
    lineHeights,
    radii,
  },
})
