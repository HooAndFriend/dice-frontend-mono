export const safeParseJson = (jsonString: string): any | null => {
  try {
    return JSON.parse(jsonString)
  } catch (error) {
    return jsonString
  }
}
