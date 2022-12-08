import React, {useEffect, useState} from 'react';
import {Button, Input} from "antd";
import {
    AudioOutlined,
    FileImageOutlined,
    PaperClipOutlined,
    SendOutlined,
    SmileOutlined,
    VideoCameraOutlined
} from "@ant-design/icons";
import styled from "styled-components";
import {contactType} from "../../types/Contact/contact";
import {useAppSelector} from "../../hooks/reduxHooks";
import {selectActiveContact} from "../../redux/contactSlice";
import {collection, doc, setDoc, serverTimestamp} from "firebase/firestore";
import FirebaseInit from "../../firebase/firebaseInit";
import {messageType} from "../../types/Message/message";
import moment from "moment";
import {mainUserUid} from "../../redux/userSlice";
import {useSendNewMessageToContactMutation} from "../../redux/appQueryV1";

type componentProps = {
    activeContact: contactType
}


const MessageComponentInput = (): JSX.Element => {
    const [message, setMessage] = useState('');
    const activeContact:contactType = useAppSelector(selectActiveContact);
    const firebaseInstance = FirebaseInit.getInstance();
    const messagesCollectionRef = collection(firebaseInstance.database, "messages");
    const [sendNewMessageToContact] = useSendNewMessageToContactMutation();

    const _handleOnInputChange = (messageFromInput: string) => {
        setMessage(messageFromInput);
    }

    const _handleComposeMessage = (messageToCompose: string) => {
        const COMPOSEDMESSAGE : messageType = {
            data: messageToCompose,
            timeStamp: (new Date()).valueOf(),
            uid:"",
            status: "sent",
            sender: [mainUserUid],
            receiver: [activeContact.uid]
        };
        return COMPOSEDMESSAGE;
    }

    const _handleSendMessage = async () => {
        if (message === "") {
            return;
        } else {
            const messageToSend = _handleComposeMessage(message);
            if (activeContact) {
                sendNewMessageToContact(messageToSend);
                setMessage("");
            }
        }
    }

    return (
        <>
            {Object.keys(activeContact).length === 0 ? null :
                <>
                    <InputContainer>
                        <StyledSmileOutlined/> {/*TODO: this will be a separate component for emojis*/}
                        <div>
                            <StyledInput placeholder="type a message..." value={message}
                                         onChange={(event) => _handleOnInputChange(event.target.value)} className="inputMessage"/>
                            <StyledButton type="primary" shape="circle" icon={<SendOutlined/>}
                                          onClick={_handleSendMessage} className="sendMessage"/>
                        </div>
                    </InputContainer>
                    <AccessoriesContainer>
                        <PaperClipOutlined/>
                        <FileImageOutlined/>
                        <AudioOutlined/>
                        <VideoCameraOutlined/>
                    </AccessoriesContainer>
                </>}
        </>
    );
}

export const ComponentHeaderWrapper = styled.div`
  height: 6.5rem;
  width: 100%;
  background-color: white;
  margin: 0.2rem 0 0 0;
  display: grid;
  grid-template-columns: 15% auto;
`;

export const InputContainer = styled.div`
  display: grid;
  grid-template-columns: 5% auto;
  padding: 1.5rem 0 0 0;
`;

export const StyledSmileOutlined = styled(SmileOutlined)`
  font-size: 1.5rem;
  align-self: center
`;

export const StyledInput = styled(Input)`
  width: calc(100% - 40px);
  margin-left: 0.5rem
`;

export const StyledButton = styled(Button)`
  
`;

export const AccessoriesContainer = styled.div`
  margin: 0.2rem 0 0 0.5rem;
`;

export default MessageComponentInput;