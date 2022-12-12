import React from 'react';
import {
    ComponentHeaderWrapper, StyledAvatar, StyledTitle,
    StyledTextII, HeaderTitleContainer, StyledOnlineIcon,EmptyDiv
} from "./Message.Styles";
import {contactType} from "../../types/Contact/contact";
import {MinusCircleOutlined} from "@ant-design/icons";
import {Typography} from "antd";

const {Text} = Typography

type componentProps = {
    activeContact: contactType
}

const MessageComponentHeader = ({activeContact}: componentProps): JSX.Element => {
    // @ts-ignore
    return (
        <ComponentHeaderWrapper>
            {(Object.keys(activeContact)).length > 0 ? <><StyledAvatar size={50} src={activeContact.profileImg}/>
                <HeaderTitleContainer>
                    <StyledTitle>{activeContact.name}</StyledTitle>
                    <StyledTextII>{activeContact.online ? <>
                        <StyledOnlineIcon/><Text> Online</Text></> : <>
                        <MinusCircleOutlined/><Text> Offline</Text></>}</StyledTextII>
                </HeaderTitleContainer>
            </> : null}
        </ComponentHeaderWrapper>
    );
}


export default MessageComponentHeader;