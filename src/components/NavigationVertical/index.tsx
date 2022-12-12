import React from 'react';
import styled from "styled-components";
import {RocketFilled, HomeFilled, MessageFilled, CalendarFilled, ContactsFilled} from '@ant-design/icons';
import {
    Wrapper,
    MainNavSectionWrapper,
    LogoSection,
    HomeItem,
    MessageItem,
    CalendarItem,
    ContactsItem
} from "./NavbarVertical.Styles";

function NavbarVertical() {
    return (
        <Wrapper>
            <LogoSection/>
            <MainNavSectionWrapper>
                <HomeItem/>
                <MessageItem/>
                <CalendarItem/>
                <ContactsItem/>
            </MainNavSectionWrapper>
            <div></div>
        </Wrapper>
    );
}


export default NavbarVertical;