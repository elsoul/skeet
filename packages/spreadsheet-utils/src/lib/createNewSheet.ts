import { CreateNewSheetResponse } from '@/spreadsheetTypes'
import { google } from 'googleapis'
/**
 * Creates a new sheet within an existing Google Sheets spreadsheet.
 *
 * This function uses the Google Sheets API to create a new sheet within a
 * specified spreadsheet. It requires the spreadsheet ID where the new sheet
 * will be added and the title for the new sheet. The function assumes that the
 * 'GOOGLE_APPLICATION_CREDENTIALS' environment variable is set with the path
 * to the Google service account credentials JSON file.
 *
 * Set up the 'GOOGLE_APPLICATION_CREDENTIALS' environment variable:
 * export GOOGLE_APPLICATION_CREDENTIALS=path_to_your_credentials.json
 *
 * @param {string} spreadsheetId - The ID of the Google Sheets spreadsheet where the new sheet will be added.
 * @param {string} sheetTitle - The title for the new sheet.
 * @returns {Promise<any>} - A promise that resolves with the response from the Google Sheets API after the new sheet is created.
 * @throws {Error} - Throws an error if there is an issue with creating the new sheet.
 *
 * @example
 * ```
 * const spreadsheetId = 'your_spreadsheet_id_here';
 * const sheetTitle = 'New Sheet Title';
 * (async () => {
 *   try {
 *     const response = await createNewSheet(spreadsheetId, sheetTitle);
 *     console.log('New Sheet Created:', response);
 *   } catch (error) {
 *     console.error(error);
 *   }
 * })();
 * ```
 */
export async function createNewSheet(
  spreadsheetId: string,
  sheetTitle: string,
) {
  try {
    const auth = new google.auth.GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })
    const sheets = google.sheets({ version: 'v4', auth })
    const response = await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            addSheet: {
              properties: {
                title: sheetTitle,
              },
            },
          },
        ],
      },
    })
    return response.data as CreateNewSheetResponse
  } catch (error) {
    console.error('Error in createNewSheet:', error)
    throw new Error('Error in createNewSheet')
  }
}
