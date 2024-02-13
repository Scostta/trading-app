import { BaseSyntheticEvent, MouseEvent, useEffect, useState } from 'react'
import {
  Table as ChakraTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  Flex,
  Button,
  Spinner,
  Select,
  Text,
  IconButton,
} from '@chakra-ui/react'
import { EditIcon, DeleteIcon, ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import { Column, Row } from '../types/table'
import { Loading } from './Loading'
import { bg, brand, cardBg } from '../utils/css'

interface TableProps {
  caption?: string
  columns: Array<Column>
  rows?: Array<Row> | null
  onEdit?: (row: Row) => void
  onDelete?: (row: Row) => void
  onAdd?: () => void
  addText?: string
  loadings?: {
    data?: boolean
    delete?: string | null
  }
  pagination?: {
    page: number
    rowsPerPage: number
  }
  onRowClick?: (row: Row) => void
  title?: string
}

const DEFAULT_PAGINATION = { page: 0, rowsPerPage: 10 }

const ROWS_PER_PAGE_OPTIONS = [
  { value: 5, label: 5 },
  { value: 10, label: 10 },
  { value: 25, label: 25 },
  { value: 50, label: 50 },
]

export const Table = ({
  caption,
  columns,
  rows,
  onEdit,
  onDelete,
  onAdd,
  addText,
  loadings,
  pagination = DEFAULT_PAGINATION,
  onRowClick,
  title
}: TableProps): JSX.Element => {

  const [page, pageSet] = useState<number>(0);
  const [rowsPerPage, rowsPerPageSet] = useState<number>(pagination.rowsPerPage);
  const [data, dataSet] = useState<Array<Row> | undefined>(rows ?? [])

  useEffect(() => {
    dataSet(rows?.slice(page * rowsPerPage, (page + 1) * rowsPerPage))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowsPerPage, page, rows])

  const handleOnRowClick = (row: Row) => {
    if (!row.canClick) return
    return onRowClick?.(row)
  }

  const handleOnEdit = (event: MouseEvent, row: Row) => {
    event.stopPropagation()
    onEdit?.(row)
  }

  const handleOnDelete = (event: MouseEvent, row: Row) => {
    event.stopPropagation()
    onDelete?.(row)
  }

  return (
    <Card bg={cardBg}>
      <CardHeader display="flex" justifyContent="space-between">
        <Text color="lightgray" fontSize="2xl" >{title}</Text>
        {!!onAdd && <Button colorScheme='brand' onClick={onAdd}>{addText}</Button>}
      </CardHeader>
      <CardBody>
        {loadings?.data
          ? <Loading />
          : <TableContainer>
            <ChakraTable variant='simple'>
              <TableCaption>{caption}</TableCaption>
              <Thead>
                <Tr>
                  {columns.map(({ header, isNumeric }, i) => {
                    return <Th key={i} isNumeric={isNumeric}>{header}</Th>
                  })}
                </Tr>
              </Thead>
              {<Tbody>
                {data?.map((row, i) => {
                  return (
                    <Tr
                      key={i}
                      cursor={row.canClick ? "pointer" : "default"}
                      onClick={() => handleOnRowClick(row)}
                      _hover={{ bg: row.canClick ? bg : "transparent" }}
                    >
                      {columns.map(({ isNumeric, field, component: Compo, options }, i) => <Td key={i} isNumeric={isNumeric}>
                        {Compo ? <Compo {...{ [field]: row[field], options }} /> : row[field]}
                      </Td>)}
                      <Td width={2}>
                        <Flex gap={2}>
                          {!!onEdit && <EditIcon _hover={{ color: brand, transform: "scale(1.2)" }} onClick={(e) => handleOnEdit(e, row)} cursor="pointer" />}
                          {!!onDelete && <>
                            {loadings?.delete === row.id
                              ? <Spinner size="sm" />
                              : <DeleteIcon _hover={{ color: brand, transform: "scale(1.2)" }} onClick={(e) => handleOnDelete(e, row)} cursor="pointer" />
                            }
                          </>}
                        </Flex>
                      </Td>
                    </Tr>
                  )
                })}
              </Tbody>}
            </ChakraTable>
          </TableContainer>}
      </CardBody>
      <CardFooter>
        <Flex gap={8} justifyContent="flex-end" w="full">
          <Flex alignContent="center" gap={4}>
            <Text display="flex" alignItems="center" css={{ textWrap: "nowrap" }}>Filas por página:</Text>
            <Select
              _hover={{ borderColor: brand }}
              _focusVisible={{ borderColor: brand }}
              onChange={(e: BaseSyntheticEvent) => {
                pageSet(0)
                rowsPerPageSet(e.target.value)
              }}
              defaultValue={rowsPerPage}
            >
              {ROWS_PER_PAGE_OPTIONS.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
            </Select>
          </Flex>
          <Flex alignItems="center" gap={4}>
            <IconButton
              aria-label='left'
              icon={<ArrowLeftIcon />}
              onClick={() => pageSet(page - 1)}
              isDisabled={page === 0}
              color={brand}
            />
            <Text fontWeight={600} >{page + 1}</Text>
            <IconButton
              aria-label='right'
              icon={<ArrowRightIcon />}
              onClick={() => pageSet(page + 1)}
              isDisabled={(rows?.length || 0) <= rowsPerPage * (page + 1)}
              color={brand}
            />
          </Flex>
        </Flex>
      </CardFooter>
    </Card>
  )
}