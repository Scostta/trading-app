import { useEffect, useState } from 'react'
import { ChakraProvider, createStandaloneToast } from '@chakra-ui/react'
import { onAuthStateChanged } from 'firebase/auth'
import Routes from './routes'
import { auth } from './services/firebase/config'
import { userAtom } from './store/user'
import { useSetAtom } from 'jotai'
import { Loading } from './components/Loading'
import Layout from './layouts/default'
import theme from './theme'

function App() {

  const [isInitialized, isInitializedSet] = useState<boolean>(false)
  const setUser = useSetAtom(userAtom)
  const { ToastContainer } = createStandaloneToast()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      isInitializedSet(true)
    })

    return unsubscribe
  }, [setUser])

  return (
    <ChakraProvider theme={theme} toastOptions={{ defaultOptions: { position: 'bottom-left' } }}>
      <Layout>
        {!isInitialized ? <Loading /> : <Routes />}
      </Layout>
      <ToastContainer />
    </ChakraProvider>
  )
}

export default App
