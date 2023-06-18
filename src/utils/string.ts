export const convertToKebabCase = (str: string) => {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

export const convertFromKebabCaseToLowerCase = (str: string) => {
  return str.replace(/-/g, '').toLowerCase()
}
