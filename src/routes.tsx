import Messaging from "./pages/messaging";
import React from "react";
import SignIn from "./pages/login";
import SignUp from "./pages/register";
import SideBar from "./components/Sidebar-info";

const routes = [
    {
        path: "/",
        element: <SignIn/>,
    },
    {
        path: "/signin",
        element: <SignIn/>,
    },
    {
        path: "/about",
        element: <SideBar/>,
    },
    {
        path: "signup",
        element: <SignUp/>,
        children: [
            {
                path: "signin",
                element:<></> ,
            },
        ],
    },
    {
        path: "messaging",
        element: <Messaging />,
        children: [
            {
                path: "privacy",
                element: <></>,
            },
        ],
    },
    {
        path: "private",
        element: <></>,
        children: [
            {
                path: "",
                element: <></>,
            },
        ],
    },
    {
        path: "*",
        element: <></>,
        children: [
            {
                path: "*",
                element: <></>,
            },
        ],
    },
];

export default routes;