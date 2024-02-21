/**
 * Converts a string to kebab case.
 *
 * @param str - The input string to be converted.
 * @returns The kebab case version of the input string.
 *
 * @example
 * const inputString = 'convertToKebabCase';
 * const kebabCaseString = convertToKebabCase(inputString);
 * console.log(kebabCaseString); // "convert-to-kebab-case"
 */
export const convertToKebabCase = (str: string): string => {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

/**
 * Converts a kebab case string to lower case.
 *
 * @param str - The input string in kebab case.
 * @returns The lower case version of the input string.
 *
 * @example
 * const inputString = 'convert-to-kebab-case';
 * const lowerCaseString = convertFromKebabCaseToLowerCase(inputString);
 * console.log(lowerCaseString); // "converttokebabcase"
 */
export const convertFromKebabCaseToLowerCase = (str: string): string => {
  return str.replace(/-/g, '').toLowerCase()
}

/**
 * Converts a string to Pascal case.
 *
 * @param str - The input string to be converted.
 * @returns The Pascal case version of the input string.
 *
 * @example
 * const inputString = 'to_pascal_case';
 * const pascalCaseString = toPascalCase(inputString);
 * console.log(pascalCaseString); // "ToPascalCase"
 */
export const toPascalCase = (str: string): string => {
  return str
    .split(/(?=[A-Z])|[-_\s]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('')
}

/**
 * Converts a string to Camel case.
 *
 * @param str - The input string to be converted.
 * @returns The Camel case version of the input string.
 *
 * @example
 * const inputString = 'to_camel_case';
 * const camelCaseString = toCamelCase(inputString);
 * console.log(camelCaseString); // "toCamelCase"
 */
export const toCamelCase = (str: string): string => {
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

/**
 * Converts the first character of a string to upper case.
 *
 * @param str - The input string.
 * @returns The input string with the first character in upper case.
 *
 * @example
 * const inputString = 'hello';
 * const upperCaseString = toUpperCase(inputString);
 * console.log(upperCaseString); // "Hello"
 */
export const toUpperCase = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Converts the first character of a string to lower case.
 *
 * @param str - The input string.
 * @returns The input string with the first character in lower case.
 *
 * @example
 * const inputString = 'World';
 * const lowerCaseString = toLowerCase(inputString);
 * console.log(lowerCaseString); // "world"
 */
export const toLowerCase = (str: string): string => {
  return str.charAt(0).toLowerCase() + str.slice(1)
}
