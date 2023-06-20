export const convertToKebabCase = (str: string) => {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

export const convertFromKebabCaseToLowerCase = (str: string) => {
  return str.replace(/-/g, '').toLowerCase()
}

export const toPascalCase = (str: string) => {
  return str
    .split(/(?=[A-Z])|[-_\s]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('')
}

export const toCamelCase = (str: string) => {
  return str
    .split(/(?=[A-Z])|[-_\s]/)
    .map((word, index) => {
      if (index === 0) {
        return word.toLowerCase()
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    })
    .join('')
}
