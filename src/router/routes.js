import Zones from "../pages/Zones/Zones";
import Auth from "../pages/Auth/Auth";
import ZoneById from "../pages/ZoneById/ZoneById";
import UserProfile from "../pages/UserProfile/UserProfile";
import NewReservation from "../pages/NewReservation/NewReservation";
import Welcome from "../pages/Welcome/Welcome";
import AdminPage from "../pages/Admin/AdminPage";

export const privateRoutes = [
    {path: '/zones', element: <Zones/>},
    {path: '/zones/:id', element: <ZoneById/>},
    {path: '/profile/:id', element: <UserProfile/>},
    {path: '/new-reservation', element: <NewReservation/>},
    {path: '/welcome', element: <Welcome/>}
]
export const publicRoutes = [
    {path: '/login', element: <Auth/>}
]

export const adminRoutes = [
    {path: '/admin', element: <AdminPage/>}
]