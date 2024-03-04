export type AppendDataResponse = {
  spreadsheetId: string
  tableRange: string
  updates: {
    spreadsheetId: string
    updatedRange: string
    updatedRows: number
    updatedColumns: number
    updatedCells: number
  }
}

export type SpreadsheetRow = Array<string | number>

export type SpreadsheetData = Array<SpreadsheetRow>

export type GridProperties = {
  rowCount: number
  columnCount: number
}

export type SheetProperties = {
  sheetId: number
  title: string
  index: number
  sheetType: string
  gridProperties: GridProperties
}

export type AddSheetResponse = {
  properties: SheetProperties
}

export type CreateNewSheetResponse = {
  spreadsheetId: string
  replies: Array<{ addSheet: AddSheetResponse }>
}
