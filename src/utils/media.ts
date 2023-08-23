export const createObjectURL = (blob: Blob) => {
  return (window.URL || webkitURL).createObjectURL(blob)
}

export const revokeObjectURL = (url: string) => {
  return (window.URL || webkitURL).revokeObjectURL(url)
}