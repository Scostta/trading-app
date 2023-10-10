import { useState } from "react"
import { Table } from "../../../../../../components/Table"
import TradeForm from "../TradeForm"
import { TRADE_FIELDS } from "../../../../../../constants/fields"
import { useDeleteTrade } from "../../../../../../hooks/useTrades"
import { Trade } from "../../../../../../types/db"
import { TradeFormData } from "../../../../../../types/forms"
import TradeImagesModal from "../TradeImagesModal"

interface TradesTableProps {
  data?: Array<Trade>
  isLoading?: boolean
}

export const TradesTable = ({ data, isLoading }: TradesTableProps): JSX.Element => {
  const [selectedTrade, selectedTradeSet] = useState<Trade | null>(null)
  const [showImagesModal, showImagesModalSet] = useState<string | null>(null)

  const { onDelete, isLoading: loadingId } = useDeleteTrade()

  const columns = TRADE_FIELDS.filter(field => !field.notShowing).map(({ label, key }) => ({
    header: label,
    field: key
  }))

  const dataTable = data?.map(trade => ({
    ...trade,
    canClick: trade.imagesPaths?.length
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
        onDelete={(row) => onDelete(row.id, row.linkId, row.imagesPaths)}
        onEdit={(row) => selectedTradeSet(row as Trade)}
        onRowClick={(row) => showImagesModalSet(row.id)}
      />
      <TradeForm isEdit isOpen={isOpen} onClose={handleOnClose} data={selectedTrade as TradeFormData | null} />
      <TradeImagesModal isOpen={Boolean(showImagesModal)} onClose={() => showImagesModalSet(null)} tradeId={showImagesModal} />
    </>
  )
}