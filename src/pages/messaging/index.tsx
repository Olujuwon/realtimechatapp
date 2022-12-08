import React from 'react';
import {MessagesSection, ContactsSection, NavigationSection, Wrapper} from "./Messaging.Styles";
import NavbarVertical from "../../components/NavigationVertical";
import MessageComponent from "../../components/MessageComponent";
import Contacts from "../../components/Contacts";

function Messaging() {
    return (
        <Wrapper>
            <NavigationSection>
                <NavbarVertical/>
            </NavigationSection>
            <ContactsSection>
                <Contacts/>
            </ContactsSection>
            <MessagesSection>
                <MessageComponent/>
            </MessagesSection>
        </Wrapper>
    );
}


export default Messaging;