import Zones from "../pages/Zones/Zones";
import Auth from "../pages/Auth/Auth";
import ZoneById from "../pages/ZoneById/ZoneById";
import UserProfile from "../pages/UserProfile/UserProfile";
import NewReservation from "../pages/NewReservation/NewReservation";

export const privateRoutes = [
    {path: '/zones', element: <Zones/>},
    {path: '/zones/:id', element: <ZoneById/>},
    {path: '/profile', element: <UserProfile/>},
    {path: '/new-reservation', element: <NewReservation/>}
]
export const publicRoutes = [
    {path: '/login', element: <Auth/>},
]