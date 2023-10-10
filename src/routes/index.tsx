import { BrowserRouter, Routes as BrowserRoutes, Route } from 'react-router-dom'
import { useAtomValue } from 'jotai'
import { userAtom } from '../store/user'
import { ROUTES } from './constants'
import Dashboard from '../pages/Dashboard'
import Login from '../pages/Login'
// import Register from '../pages/Register'
import PrivateRoutes from './components/PrivateRoutes'
import Accounts from '../pages/Accounts'
import { metatraderAccountIdAtom } from '../store/account'

const Routes = (): JSX.Element => {

    const user = useAtomValue(userAtom)
    const metatraderIdAccount = useAtomValue(metatraderAccountIdAtom)
    const isLogged = Boolean(user)

    return <BrowserRouter>
        <BrowserRoutes>
            <Route element={<PrivateRoutes condition={isLogged} to={ROUTES.LOGIN} />}>
                <Route element={<PrivateRoutes condition={!!metatraderIdAccount} to={ROUTES.ACCOUNTS} />}>
                    <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
                </Route>
                <Route element={<PrivateRoutes condition={!metatraderIdAccount} to={ROUTES.DASHBOARD} />}>
                    <Route path={ROUTES.ACCOUNTS} element={<Accounts />} />
                </Route>
            </Route>
            <Route element={<PrivateRoutes condition={!isLogged} to={ROUTES.DASHBOARD} />}>
                <Route path={ROUTES.LOGIN} element={<Login />} />
                {/* <Route path={ROUTES.REGISTER} element={<Register />} /> */}
            </Route>
        </BrowserRoutes>
    </BrowserRouter>
}

export default Routes