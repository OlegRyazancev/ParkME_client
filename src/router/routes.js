import Zones from "../pages/Zones/Zones";
import Auth from "../pages/Auth/Auth";
import ZoneById from "../pages/ZoneById/ZoneById";

export const privateRoutes = [
    {path: '/zones', element: <Zones/>},
    {path: '/zones/:id', element: <ZoneById/>}
]
export const publicRoutes = [
    {path: '/login', element: <Auth/>},
]