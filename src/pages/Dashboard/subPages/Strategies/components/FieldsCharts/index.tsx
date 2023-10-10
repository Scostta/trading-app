import { Box, Card, CardBody, CardHeader, CardProps, Flex, Select, Text } from '@chakra-ui/react';
import { Trade } from '../../../../../../types/db';
import { TRADE_FIELDS } from '../../../../../../constants/fields';
import { ChangeEvent, useState } from 'react';
import { DoughnutChart } from '../../../../../../components/DoughnutChart';
import { parseWinnerFields } from '../../../../../../utils/charts';
import { cardBg } from '../../../../../../utils/css';

interface FieldsChartsProps {
  data?: Array<Trade>
  containerProps?: CardProps
}

export const FieldsCharts = ({ data, containerProps = {} }: FieldsChartsProps): JSX.Element | null => {
  const [selectedField, selectedFieldSet] = useState<keyof Trade>("" as keyof Trade)
  const [selectedValue, selectedValueSet] = useState<string>("")

  const handleOnFieldChange = (e: ChangeEvent<HTMLSelectElement>) => {
    selectedValueSet("")
    selectedFieldSet(e.target.value as keyof Trade)
  }

  const filteredFields = TRADE_FIELDS.filter(field => Boolean(field.options) && field.key !== "result")

  if (!data) return null
  return (
    <Card {...containerProps} bg={cardBg}>
      <CardHeader display="flex" gap={4} justifyContent="center" >
        <Box w={80}>
          <Select
            placeholder={"Select field..."}
            value={selectedField}
            onChange={handleOnFieldChange}
          >
            {filteredFields.map(({ key, label }) => <option key={key} value={key}>{label}</option>)}
          </Select>
        </Box>
        <Box w={80}>
          <Select
            placeholder={"Select value..."}
            value={selectedValue}
            disabled={!selectedField}
            onChange={(e) => selectedValueSet(e.target.value)}
          >
            {filteredFields.find(field => field.key == selectedField)?.options?.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </Select>
        </Box>
      </CardHeader>
      <CardBody display="flex" flexWrap="wrap" gap={4} justifyContent="center">
        {filteredFields.map(({ label, options, key }) => (
          <Box w={"145px"} key={key}>
            <Flex gap={4} flexDirection="column" alignItems="center">
              <Flex flexDir="column" gap={2}>
                <Text fontSize="smaller" >{label}</Text>
                <Flex flexDir="column" alignItems="center" minH="54px" justifyContent="center">
                  {options?.map(({ label, value }) => <Text key={value} fontSize="xx-small">{label}</Text>)}
                </Flex>
              </Flex>
              <DoughnutChart
                data={parseWinnerFields(data, options, key, { field: selectedField, value: selectedValue })}
                withoutCard
                options={
                  {
                    plugins: {
                      legend: { display: false },
                    },
                  }
                }
              />
            </Flex>
          </Box>
        ))}
      </CardBody>
    </Card>
  )
}
