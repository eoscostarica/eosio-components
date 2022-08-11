const toCapitalCase = (string = '') => {
  return string
    .split('')
    .map((char, index) => (index === 0 ? char.toUpperCase() : char))
    .join('')
}

export { toCapitalCase }