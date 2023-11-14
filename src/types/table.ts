export type Column = {
    header: string | JSX.Element
    field: string
    isNumeric?: boolean
    component?: any,
    options?: Array<{ value: string, label: string }>
}

export type Row = {
    [key: string]: any
}