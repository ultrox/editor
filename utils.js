export function isLineBreak(text) {
  return /\<br\>\r/.test(text.substr(-5))
}
