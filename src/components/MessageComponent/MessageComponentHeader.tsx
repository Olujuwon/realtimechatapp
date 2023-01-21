import React from 'react';
import {MessagesHeaderContainer, MessagesHeaderUtilities} from "./Message.Styles";
import {contactType} from "../../types/Contact/contact";
import {Button, Card} from 'react-bootstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircle} from "@fortawesome/free-solid-svg-icons";
import UserOnline from '../Contacts/UserOnline';
// @ts-ignore
import { Phone, Video, MoreHorizontal } from "react-feather";


type componentProps = {
    activeContact: contactType
}

const MessageComponentHeader = ({activeContact}: componentProps): JSX.Element => {
    // @ts-ignore
    return (
        <MessagesHeaderContainer className="px-5 pt-2">
            <div className="d-flex pt-2">
                {(Object.keys(activeContact)).length > 0 ? <><img
                    src={activeContact.profileImg}
                    className="rounded-circle me-1"
                    alt={activeContact.name}
                    width="30"
                    height="30"
                />
                    <div className="mx-2">
                        <h6 className="mb-0">{activeContact.name}</h6>
                        <UserOnline/>
                    </div>
                </> : null}
            </div>
            <MessagesHeaderUtilities >
                <Button size="sm" variant="primary" className="px-3 me-2">
                    <Phone className="feather"/>
                </Button>
                <Button
                    size="sm"
                    variant="info"
                    className="me-2 px-3 d-none d-md-inline-block"
                >
                    <Video className="feather"/>
                </Button>
                <Button size="sm" variant="light" className="px-3 border">
                    <MoreHorizontal className="feather"/>
                </Button>
            </MessagesHeaderUtilities>
        </MessagesHeaderContainer>
    );
}


export default MessageComponentHeader;