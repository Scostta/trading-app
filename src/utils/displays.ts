export const addSufixToNumber = (num: number | undefined, sufix: string, fixed?: number) => {
  if (!num) return "-"
  return `${num?.toFixed(fixed ?? 2)} ${sufix}`
}

export const formatPrice = (num?: number) => {
  if (!num) return '-'
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(num)
}