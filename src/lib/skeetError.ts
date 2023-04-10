export const skeetError = async (functionName: string, error: any) => {
  const errorLog = `${functionName}: ${error}`
  console.log(errorLog)
  throw new Error(errorLog)
}
