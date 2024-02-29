export const copyToClipboard = (content: string | null | undefined) => {
  if (content == null) return false
  if (navigator == null) return false
  void navigator.clipboard.writeText(content)
}
