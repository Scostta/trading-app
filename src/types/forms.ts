
export type AuthFormData = {
    email: string;
    password: string;
};

export type TradeFormData = {
    pipsSl: string
    date: string
    orderType: string
    executionType: string
    sesion: string
    killzoneTime: string
    result: string
    strategy: string
    trend: string
    scanTimeframe: string
    entryType: string
    entryTimeframe: string
    tradingviewEntry?: FileList | null
    tradingviewScan?: FileList | null
    isBE?: boolean
    imagesPaths?: Array<string>
}

export interface GoalFormData {
    label: string
    field: string
    valuePrefix: "money" | "percentage",
    type: "PASSED" | "FAILED",
    goalValue: number | null,
    showInOverview: boolean
    id?: string
} 