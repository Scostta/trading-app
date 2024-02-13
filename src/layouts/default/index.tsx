import { Container, Box } from "@chakra-ui/react"

const Layout = ({ children }: { children: React.ReactElement }): JSX.Element => {

  return <Box w="full" h="full">
    <Container margin={0} maxWidth="full" py={4} height="full">
      {children}
    </Container>
  </Box>
}

export default Layout