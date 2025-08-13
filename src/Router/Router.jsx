import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home";
import App from "../App";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Dashboard from "../Pages/Dashboard/Dashboard";
import AddPet from "../Pages/AddPet/AddPet";
import MyPets from "../Pages/MyPets/MyPets";
import AdoptRequests from "../Pages/AdoptReq/AdoptRequests";
import MyDonations from "../Pages/My Donations/MyDonations";
import MyCampaigns from "../Pages/MyCampaigns/MyCampaigns";
import CreateDonations from "../Pages/CreateDonation/CreateDonations";
import UpdatePet from "../Pages/UpdatePet/UpdatePet";
import UpdateDonationCampaign from "../Pages/UpdateDonation/UpdateDOnation";
import Donations from "../Pages/Donations/Donations";
import ListedPets from "../Pages/ListedPets/ListedPets";
import DonationDetailsCard from "../Pages/Donations/DonationDetails";
import PetDetailsCard from "../Pages/ListedPets/PetDetails";
import PrivateRoute from "../PrivateRoutes/PrivateRoute";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import AllUsers from "../Pages/AllUsers/AllUsers";
import DashHome from "../Pages/DashHome/DashHome";
import AdminRoute from "../PrivateRoutes/AdminRoute";
import AllPets from "../Pages/AllPets/AllPets";
import AllDonations from "../Pages/AllDonations/AllDonations";
import Forbidden from "../Pages/Forbidden/Forbidden";

export const Router = createBrowserRouter([
    {
        path: "/",
        Component: Home,
        children: [
            {
                index: true,
                Component: App
            },
            {
                path: "/listedpets",
                Component: ListedPets
            },
            {
                path: "/listedpets/:id",
                Component: PetDetailsCard
            },
            {
                path:"/donations",
                Component:Donations
            },
            {
                path: "/donations/:id",
                Component: DonationDetailsCard
            },
            {
                path:"/login",
                Component: Login
            },
            {
                path:"/register",
                Component: Register
            }
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                index:true,
                Component: DashHome
            },
            {
                path: "/dashboard/addpet",
                element: <PrivateRoute><AddPet></AddPet></PrivateRoute>
            },
            {
                path: "/dashboard/mypets",
                element:<PrivateRoute><MyPets></MyPets></PrivateRoute>
            },
            {
                path:"/dashboard/createdonation",
                element: <PrivateRoute><CreateDonations></CreateDonations></PrivateRoute>
            },
            {
                path: "/dashboard/updatepet/:petId",
                element: <PrivateRoute><UpdatePet></UpdatePet></PrivateRoute>
            },
            {
                path: "/dashboard/updatecampaign/:id",
                element: <PrivateRoute><UpdateDonationCampaign></UpdateDonationCampaign></PrivateRoute>
            },
            {
                path: "/dashboard/adoptrequests",
                element:<PrivateRoute><AdoptRequests></AdoptRequests></PrivateRoute>
            },
            {
                path: "/dashboard/mydonations",
                element:<PrivateRoute><MyDonations></MyDonations></PrivateRoute>
            },
            {
                path: "/dashboard/mycampaigns",
                element:<PrivateRoute><MyCampaigns></MyCampaigns></PrivateRoute>
            },
            {
                path: "/dashboard/allusers",
                element:<AdminRoute><AllUsers></AllUsers></AdminRoute>
            }, 
            {
                path: "/dashboard/allpets",
                element:<AdminRoute><AllPets></AllPets></AdminRoute>
            },
            {
                path:"/dashboard/alldonations",
                element:<AdminRoute><AllDonations></AllDonations></AdminRoute>
            }
        ]
    },
    {
        path: "*",
        Component: ErrorPage
    },
    {
        path: "/forbidden",
        Component: Forbidden
    }
])