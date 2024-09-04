module.exports = (text) => text
  .replaceAll(/([。！；？;?])([^”’])/g, '[[end]]')
  .replaceAll(/([。！？?][”’])([^，。！？?])/g, '[[end]]')
  .replaceAll('​', '')
  .replaceAll(/\s/g, '')
  .split('[[end]]')
  .filter((str) => !!str.trim());
