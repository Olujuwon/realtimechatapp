import React, {useEffect, useState} from 'react';
import './App.css';
import {HelmetProvider, Helmet} from "react-helmet-async";
import {useAppDispatch, useAppSelector} from "./hooks/reduxHooks";
import {fetchSignedInUser, registerNewTestUsers, selectUser} from "./redux/userSlice";
import {useCreateTestContactsMutation} from "./redux/appQueryV1";
import {useRoutes} from "react-router-dom";
import routes from "./routes";
import {addTestMessagesToFirebase} from "./redux/messageSlice";


/*
* TODO
*  fetch user here and use to route
* */
function App() {
    const content = useRoutes(routes);
    const dispatch = useAppDispatch();
    const [signedinUser, setSignedinUser] = useState(useAppSelector(selectUser));
    const [createTestContacts] = useCreateTestContactsMutation();

    useEffect(() => {
        //createTestData();
        if (Object.keys(signedinUser).length === 0) {
            dispatch(fetchSignedInUser());
        }
    }, [signedinUser])

    const createTestData = () => {
        //dispatch(registerNewTestUsers());
        // @ts-ignore
        //createTestContacts();
        dispatch(addTestMessagesToFirebase());
    }
    return (
        <HelmetProvider>
            <Helmet
                titleTemplate="%s | Messaging App"
                defaultTitle="Messaging App"
            />
            <div className="App">
                {content}
            </div>
        </HelmetProvider>
    );
}

export default App;
