/* eslint-disable no-unused-vars */
export function isScreenWidthMobile() {
  const sizeScreen = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  if (sizeScreen >= 600) return false

  return true
}
