import { execSync } from 'child_process'

export const firebaseAppList = async () => {
  try {
    const shCmd = ['firebase', 'apps:list']
    const res = String(execSync(shCmd.join(' '))).trim()

    // テーブルの解析
    const rows = res.split('\n').slice(3, -2) // ヘッダーとフッターを除外
    const appList = rows
      .filter(
        (row) => row.includes('│') && !row.includes('├') && !row.includes('└')
      )
      .map((row) => {
        const columns = row
          .split('│')
          .map((col) => col.trim())
          .filter(Boolean)
        return {
          'App Display Name': columns[0],
          'App ID': columns[1],
          Platform: columns[2],
        }
      })

    // 結果をJSON文字列に変換して表示
    const jsonResult = JSON.stringify(appList, null, 2)
    return jsonResult
  } catch (error) {
    throw new Error(`firebaseAppList: ${error}`)
  }
}
