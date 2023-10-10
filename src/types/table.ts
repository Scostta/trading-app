export type Column = {
    header: string | JSX.Element
    field: string
    isNumeric?: boolean
    component?: any
}

export type Row = {
    [key: string]: any
}