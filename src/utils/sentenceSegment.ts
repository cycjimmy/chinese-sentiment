function sentenceSegment(text: string): string[] {
  return text
    .replaceAll(/([。！；？;?])([^”’])/g, '[[end]]')
    .replaceAll(/([。！？?][”’])([^，。！？?])/g, '[[end]]')
    .replaceAll('\u200B', '')
    .replaceAll(/\s/g, '')
    .split('[[end]]')
    .filter(str => !!str.trim())
}

export default sentenceSegment
