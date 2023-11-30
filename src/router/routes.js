import Zones from "../pages/Zones";
import Auth from "../pages/Auth/Auth";

export const privateRoutes = [
    {path: '/zones', element: <Zones/>}
]
export const publicRoutes = [
    {path: '/login', element: <Auth/>},
]