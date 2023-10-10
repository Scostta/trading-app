export const getMonthByDate = (date: string) => {
  return new Date(date).toLocaleString('es', { month: 'long' })
}

export const formatDate = (date?: Date): string => {
  if (!date) return ""
  return date.toLocaleDateString("es", { dateStyle: "medium" })
}