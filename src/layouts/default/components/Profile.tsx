import { Button, Flex, FormControl, FormLabel, Icon, Switch, Text } from "@chakra-ui/react"
import { firebaseSignOut } from "../../../services/firebase/auth"
import { IoMdLogOut } from 'react-icons/io'

export const Profile = (): JSX.Element => {

  return (
    <Flex flexDirection="column" gap={4}>
      <FormControl display='flex' alignItems='center'>
        <FormLabel htmlFor='email-alerts' mb='0'>
          <Text>Cuenta real</Text>
        </FormLabel>
        <Switch id='email-alerts' />
      </FormControl>
      <Button onClick={firebaseSignOut}>
        <Flex alignItems="center" gap={2}>
          <Text>Logout</Text>
          <Icon cursor="pointer" as={IoMdLogOut} boxSize={8} />
        </Flex>
      </Button>
    </Flex>
  )
}