import {
  convertFromKebabCaseToLowerCase,
  convertToKebabCase,
  toCamelCase,
  toLowerCase,
  toPascalCase,
  toUpperCase,
} from '@/utils/string'

describe('utils/string.ts', () => {
  describe('convertToKebabCase()', () => {
    it('should convert string to kebab case when the string has lowercase and uppercase letters', () => {
      const expected = 'test-string'
      const result = convertToKebabCase('testString')

      expect(result).toEqual(expected)
    })

    it('should return the same string in lower case when the string has only lowercase or only uppercase letters', () => {
      const expected = 'teststring'
      const lowercaseResult = convertToKebabCase('teststring')
      const uppercaseResult = convertToKebabCase('TESTSTRING')

      expect(lowercaseResult).toEqual(expected)
      expect(uppercaseResult).toEqual(expected)
    })
  })

  describe('convertFromKebabCaseToLowerCase()', () => {
    it('should removes all dash character and returns in lowercase', () => {
      const expected = 'teststring'
      const result = convertFromKebabCaseToLowerCase('TEST-string')

      expect(result).toEqual(expected)
    })
  })

  describe('toPascalCase()', () => {
    it('should convert string to pascal case when argument has only uppercase letters or lowercase letters', () => {
      const expected = 'Teststring'
      const lowercaseResult = toPascalCase('teststring')
      const uppercaseResult = toPascalCase('TESTSTRING')

      expect(lowercaseResult).toEqual(expected)
      expect(uppercaseResult).toEqual(expected)
    })

    it('should convert string to pascal case when argument is camelcase', () => {
      const expected = 'TestString'
      const result = toPascalCase('testString')

      expect(result).toEqual(expected)
    })

    it('should convert string to pascal case when argument is kebabcase', () => {
      const expected = 'TestString'
      const result = toPascalCase('test-string')

      expect(result).toEqual(expected)
    })

    it('should convert string to pascal case when argument has spaces', () => {
      const expected = 'TestString'
      const result = toPascalCase('test string')

      expect(result).toEqual(expected)
    })

    it('should convert string to pascal case when argument has underline character', () => {
      const expected = 'TestString'
      const result = toPascalCase('test_string')

      expect(result).toEqual(expected)
    })
  })

  describe('toCamelCase()', () => {
    it('should convert string to camel case when argument has only uppercase letters or lowercase letters', () => {
      const expected = 'teststring'
      const lowercaseResult = toCamelCase('teststring')
      const uppercaseResult = toCamelCase('TESTSTRING')

      expect(lowercaseResult).toEqual(expected)
      expect(uppercaseResult).toEqual(expected)
    })

    it('should convert string to camel case when argument is pascalcase', () => {
      const expected = 'testString'
      const result = toCamelCase('TestString')

      expect(result).toEqual(expected)
    })

    it('should convert string to camel case when argument is kebabcase', () => {
      const expected = 'testString'
      const result = toCamelCase('test-string')

      expect(result).toEqual(expected)
    })

    it('should convert string to camel case when argument has spaces', () => {
      const expected = 'testString'
      const result = toCamelCase('test string')

      expect(result).toEqual(expected)
    })

    it('should convert string to camel case when argument has underline character', () => {
      const expected = 'testString'
      const result = toCamelCase('test_string')

      expect(result).toEqual(expected)
    })
  })

  describe('toUpperCase()', () => {
    it('should transform the first letter in uppercase', async () => {
      const expected = 'Test string'
      const result = toUpperCase('test string')

      expect(result).toEqual(expected)
    })
  })

  describe('toLowerCase()', () => {
    it('should transform the first letter in lowercase', () => {
      const expected = 'tEST STRING'
      const result = toLowerCase('TEST STRING')

      expect(result).toEqual(expected)
    })
  })
})
