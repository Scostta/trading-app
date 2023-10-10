export const addSufixToNumber = (num: number | undefined, sufix: string, fixed?: number) => {
  if (!num) return "-"
  return `${num?.toFixed(fixed ?? 2)} ${sufix}`
}