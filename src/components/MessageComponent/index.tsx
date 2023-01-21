import React, {useEffect} from 'react';
import styled from "styled-components";
import MessageComponentHeader from "./MessageComponentHeader";
import MessageComponentBody from "./MessageComponentBody";
import MessageComponentInput from "./MessageComponentInput";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {selectActiveContact} from "../../redux/contactSlice";
import {useGetAllActiveContactMessageQuery} from "../../redux/appQueryV1";
import {Row} from "react-bootstrap";


const MessageComponent = (): JSX.Element => {
    const activeContactValue = useAppSelector(selectActiveContact);
    // @ts-ignore
    const {data, error, isLoading} = useGetAllActiveContactMessageQuery(activeContactValue);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (Object.keys(activeContactValue).length > 0) {
            console.log("sajgfdasghgdsa", data)
        }
    }, [activeContactValue])

    return (
        <Row className="vh-100">
            {(Object.keys(activeContactValue)).length <= 0 ? null : <><MessageComponentHeader
                activeContact={activeContactValue}/>
                <MessageComponentBody activeContact={activeContactValue}/>
                <MessageComponentInput/></>}
        </Row>
    );
}


export const Wrapper = styled.div`

  width: auto;
  background: #DAD7CD;
  display: grid;
  grid-template-rows: 10% 5% 75% 10%
`;

export default MessageComponent;