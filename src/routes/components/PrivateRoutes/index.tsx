import { Outlet, Navigate } from "react-router-dom";
import { ROUTES } from "../../constants";

type PrivateRoutesProps = {
    condition?: boolean
    to: typeof ROUTES[keyof typeof ROUTES]
}

const PrivateRoutes = ({ condition, to }: PrivateRoutesProps): JSX.Element => {

    return (
        condition ? <Outlet /> : <Navigate to={to} />
    )
}

export default PrivateRoutes