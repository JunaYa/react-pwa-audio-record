export const createObjectURL = (blob: Blob) => {
  return (URL || webkitURL).createObjectURL(blob)
}

export const revokeObjectURL = (url: string) => {
  return (URL || webkitURL).revokeObjectURL(url)
}