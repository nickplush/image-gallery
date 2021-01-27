export function checkCoords(el, position) {
  return el.current.getBoundingClientRect().top + position < position + 1500;
}
