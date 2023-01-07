import React from 'react';
import {
    ComponentHeaderWrapper, StyledAvatar, StyledTitle,
    StyledTextII, HeaderTitleContainer, StyledOnlineIcon,EmptyDiv
} from "./Message.Styles";
import {contactType} from "../../types/Contact/contact";
import {MinusCircleOutlined} from "@ant-design/icons";
import {Typography} from "antd";
import { Card } from 'react-bootstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircle} from "@fortawesome/free-solid-svg-icons";
import UserOnline from '../Contacts/UserOnline';

const {Text} = Typography

type componentProps = {
    activeContact: contactType
}

const MessageComponentHeader = ({activeContact}: componentProps): JSX.Element => {
    // @ts-ignore
    return (
        <div className="px-5 pt-2">
            <div className="d-flex">
                {(Object.keys(activeContact)).length > 0 ? <><img
                    src={activeContact.profileImg}
                    className="rounded-circle me-1"
                    alt={activeContact.name}
                    width="40"
                    height="40"
                />
                    <div className="">
                        <h5>{activeContact.name}</h5>
                        <UserOnline/>
                    </div>
                </> : null}
            </div>
        </div>
    );
}


export default MessageComponentHeader;