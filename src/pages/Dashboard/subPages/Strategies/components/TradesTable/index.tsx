import { useState } from "react"
import { Table } from "../../../../../../components/Table"
import TradeForm from "../TradeForm"
import { TRADE_FIELDS } from "../../../../../../constants/fields"
import { useDeleteTrade } from "../../../../../../hooks/useTrades"
import { Trade } from "../../../../../../types/db"
import { TradeFormData } from "../../../../../../types/forms"
import { DisplayOptions } from "../../../../../../components/Displays"
import { TradeDetails } from "../TradeDetails"

interface TradesTableProps {
  data?: Array<Trade>
  isLoading?: boolean
}

export const TradesTable = ({ data, isLoading }: TradesTableProps): JSX.Element => {
  const [selectedTrade, selectedTradeSet] = useState<Trade | null>(null)
  const [showDetailsId, showDetailsIdSet] = useState<string | undefined>(undefined)

  const { onDelete, isLoading: loadingId } = useDeleteTrade()

  const columns = TRADE_FIELDS.filter(field => !field.notShowing).map(({ label, key, options }) => ({
    header: label,
    field: key,
    component: DisplayOptions,
    options
  }))

  const dataTable = data?.map(trade => ({
    ...trade,
    canClick: true
  }))

  const isOpen = Boolean(selectedTrade)

  const handleOnClose = () => {
    selectedTradeSet(null)
  }

  return (
    <>
      <Table
        loadings={{
          data: isLoading,
          delete: loadingId
        }}
        rows={dataTable}
        columns={columns}
        onDelete={(row) => onDelete(row.id, row.linkId)}
        onEdit={(row) => selectedTradeSet(row as Trade)}
        onRowClick={(row) => showDetailsIdSet(row.id)}
      />
      <TradeForm isEdit isOpen={isOpen} onClose={handleOnClose} data={selectedTrade as TradeFormData | null} />
      <TradeDetails id={showDetailsId} onClose={() => showDetailsIdSet(undefined)} />
    </>
  )
}