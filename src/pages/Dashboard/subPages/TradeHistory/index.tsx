import { Flex } from '@chakra-ui/react'
import { Table } from '../../../../components/Table'
import { COLUMNS } from './columns'
import { TradeMetatrader, TradesMetatrader } from '../../../../types/metaStats'
import TradeForm from '../Strategies/components/TradeForm'
import { TradeFormData } from '../../../../types/forms'
import { useState } from 'react'
import { useGetLinks } from '../../../../hooks/useLinks'

interface TradeHistoryProps {
  trades?: TradesMetatrader
  isLoading?: boolean
}

const TradeHistory = ({ trades, isLoading }: TradeHistoryProps): JSX.Element => {
  const [selectedTrade, selectedTradeSet] = useState<TradeMetatrader | null>(null)
  const { data, isLoading: linksLoading } = useGetLinks()
  const links = data?.map(link => link.tradeId)

  const tradesTable = trades?.map(trade => ({
    ...trade,
    canClick: !links?.includes(trade._id),
    linked: links?.includes(trade._id)
  }))

  return (
    <>
      <Flex flexDirection="column" gap={6} pb={6}>
        <Table
          title='Trades Cerrados'
          loadings={{
            data: isLoading || linksLoading,
          }}
          rows={tradesTable}
          columns={COLUMNS}
          onRowClick={(row) => selectedTradeSet(row as TradeMetatrader)}
        />
      </Flex>
      <TradeForm isOpen={!!selectedTrade} onClose={() => selectedTradeSet(null)} data={selectedTrade as TradeFormData | null} />
    </>
  )
}

export default TradeHistory