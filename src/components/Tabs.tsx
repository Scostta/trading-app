import { Tabs as ChakraTabs, TabList, TabPanels, Tab, TabPanel, UseTabsProps, css } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { activeTabIndexAtom } from '../store/tabs'

interface TabsProps {
  tabs: Array<{ label: string | JSX.Element, key: string, component: JSX.Element, icon?: JSX.Element }>
  containerProps?: UseTabsProps
}

export const Tabs = ({ tabs, containerProps }: TabsProps): JSX.Element => {
  const [activeTabIndex, activeTabIndexSet] = useAtom(activeTabIndexAtom)

  return (
    <ChakraTabs
      index={activeTabIndex}
      onChange={(index) => activeTabIndexSet(index)}
      {...containerProps}
      colorScheme='brand'
      variant="line"
    >
      <TabList
        overflowX="auto"
        css={css({
          '::-webkit-scrollbar': { display: 'none' },
        })}
      >
        {tabs.map(({ label, key, icon }) => (
          <Tab alignItems="center" alignSelf="flex-end" gap={2} mb={0} minW="max-content" key={key}>
            {label}
            {icon}
          </Tab>
        ))}
      </TabList>

      <TabPanels>
        {tabs.map(({ component, key }) => <TabPanel px={0} key={key}>{component}</TabPanel>)}
      </TabPanels>
    </ChakraTabs>
  )
}