/**
* @module addLeadingZero
* Adds a leading zero to a number if it is less than 10.
*
* @param number - The number to which a leading zero should be added.
* @returns The number as a string with a leading zero if it is less than 10, otherwise the number as a string.
* @throws Will throw an error if the number is not a positive integer.
*
* @example
* const number = 5;
* const numberWithLeadingZero = addLeadingZero(number);
* console.log(numberWithLeadingZero); // Outputs: '05'
*/
export const addLeadingZero = (number: number) => {
  try {
    if (number < 0) {
      throw new Error('Number must be a positive integer')
    }
    return number < 10 ? `0${number}` : `${number}`
  } catch (error) {
    throw new Error(`addLeadingZero failed: ${error}`)
  }
}
