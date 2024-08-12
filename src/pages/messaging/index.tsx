import React, {useEffect, useState} from 'react';

import MessageComponent from "../../components/Message";
import SideBar from "../../components/Sidebar-info";
import {
    MessagingInfoColumn,
    MessagingMessageColumn,
    MessagingWrapper
} from '../../components/Message/Message.Styles';

import useManageAuthUser from '../../hooks/useManageAuthUser';

import {useNavigate} from 'react-router-dom';

function Messaging() {
    const {isUserLoggedIn, authenticatedUser} = useManageAuthUser();
    const navigate = useNavigate();
    if (!isUserLoggedIn()) navigate("/signin");
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (authenticatedUser !== null) setUser(authenticatedUser);
    }, [authenticatedUser]);

    return (
        <MessagingWrapper>
            <MessagingInfoColumn sm md lg={2} xl={2} xxl={3}>
                <SideBar/>
            </MessagingInfoColumn>
            <MessagingMessageColumn sm md lg xl xxl>
                {user === null ? null : < MessageComponent user={user}/>}
            </MessagingMessageColumn>
        </MessagingWrapper>
    );
}

export default Messaging;
