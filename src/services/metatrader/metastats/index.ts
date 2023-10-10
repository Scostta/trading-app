import { metaStats } from "../config";
import { MetricsMetatrader, OpenTradesMetatrader, TradesMetatrader } from "../../../types/metaStats";

export const getMetrics = async (accountId: string): Promise<MetricsMetatrader | undefined> => {
  try {
    const metrics = await metaStats.getMetrics(accountId);
    return metrics
  } catch (error) {
    console.error(`metatrader: ${error}`)
  }
}

export const getAccountTrades = async (accountId: string): Promise<TradesMetatrader | undefined> => {
  try {
    const trades = await metaStats.getAccountTrades(accountId, '0000-01-01 00:00:00.000', '9999-01-01 00:00:00.000');
    return trades
  } catch (error) {
    console.error(`metatrader: ${error}`)
  }
}

export const getAccountOpenTrades = async (accountId: string): Promise<OpenTradesMetatrader | undefined> => {
  try {
    const openTrades = await metaStats.getAccountOpenTrades(accountId);
    return openTrades
  } catch (error) {
    console.error(`metatrader: ${error}`)
  }
}