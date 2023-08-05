export function captalizeFirstLetter(
  textToCaptalize: string,
  putAllAfterFirstAsLowerCase = false,
): string {
  if (!textToCaptalize) {
    return ''
  }

  if (putAllAfterFirstAsLowerCase) {
    return textToCaptalize
      .slice(0, 1)
      .toUpperCase()
      .concat(
        textToCaptalize.slice(1, textToCaptalize.length).toLocaleLowerCase(),
      )
  }

  return textToCaptalize
    .slice(0, 1)
    .toUpperCase()
    .concat(textToCaptalize.slice(1, textToCaptalize.length))
}
