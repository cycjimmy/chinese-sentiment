module.exports = (text) => text
  .replaceAll(/([。！；？;?])([^”’])/g, '[[end]]')
  .replaceAll(/([。！？?][”’])([^，。！？?])/g, '[[end]]')
  .replaceAll(/\s/g, '')
  .split('[[end]]');
