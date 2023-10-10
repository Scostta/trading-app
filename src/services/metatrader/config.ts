import MetaApi, { MetaStats } from "metaapi.cloud-sdk"

export const metaStats = new MetaStats(import.meta.env.VITE_REACT_APP_META_API_TOKEN)
export const api = new MetaApi(import.meta.env.VITE_REACT_APP_META_API_TOKEN)