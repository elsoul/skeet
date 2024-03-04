import { AppendDataResponse } from '@/spreadsheetTypes'
import { google } from 'googleapis'
/**
 * Adds specified data to a Google Spreadsheet.
 * Requires the ID of the spreadsheet and the name of the sheet where data will be added.
 * The function assumes that the
 * 'GOOGLE_APPLICATION_CREDENTIALS' environment variable is set with the path
 * to the Google service account credentials JSON file. It returns the data
 * from the spreadsheet.
 *
 * @param {string} spreadsheetId - The ID of the spreadsheet to which data is being added.
 * @param {string} sheetTitle - The name of the sheet where data will be added.
 * @param {Array<Array<string | number>>} values - Array of data to be added to the spreadsheet. Each sub-array corresponds to a row in the spreadsheet.
 * @returns {Promise<AppendDataResponse>} - A promise containing the response from the Google Sheets API.
 * @throws {Error} - Throws an error if there's an issue with the request to the Google Sheets API.
 *
 * @example
 * ```
 * // Spreadsheet ID and sheet name
 * const spreadsheetId = 'your-spreadsheet-id';
 * const sheetTitle = 'your-sheet-name';
 *
 * // Data to be added
 * const data = [
 *   ['Header1', 'Header2', 'Header3'],
 *   ['Value1', 'Value2', 'Value3']
 * ];
 *
 * // Asynchronously call the function
 * const run = async () => {
 *   try {
 *     const response = await addDataToSheet(spreadsheetId, sheetTitle, data);
 *     console.log('Added data:', response);
 *   } catch (error) {
 *     console.error('Error:', error);
 *   }
 * };
 *
 * run();
 * ```
 */
export async function addDataToSheet(
  spreadsheetId: string,
  sheetTitle: string,
  values: Array<Array<string | number>>,
) {
  try {
    const auth = new google.auth.GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const sheets = google.sheets({ version: 'v4', auth })
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: sheetTitle,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: values,
      },
    })
    console.log(response.data)
    return response.data as AppendDataResponse
  } catch (error) {
    console.error('Error in addDataToSheet:', error)
    throw new Error('Error in addDataToSheet')
  }
}
