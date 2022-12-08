import Messaging from "./pages/messaging";
import React from "react";
import Home from "./pages/home";
import SignIn from "./pages/login";
import SignUp from "./pages/register";

const routes = [
    {
        path: "/",
        element: <Home/>,
    },
    {
        path: "/signin",
        element: <SignIn/>,
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