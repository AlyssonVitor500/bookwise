export function useReduceString(
  text: string,
  textSize: number,
  textToReplace = '...',
) {
  let returnedValue = text

  if (!!text && text.length > textSize) {
    returnedValue = text.substring(0, textSize).concat(textToReplace)
  }

  return { value: returnedValue, isTextModifield: returnedValue !== text }
}
