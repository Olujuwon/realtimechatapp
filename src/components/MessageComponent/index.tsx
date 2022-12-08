import React, {useEffect} from 'react';
import styled from "styled-components";
import MessageComponentHeader from "./MessageComponentHeader";
import MessageComponentBody from "./MessageComponentBody";
import MessageComponentInput from "./MessageComponentInput";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {selectActiveContact} from "../../redux/contactSlice";
import {useGetAllActiveContactMessageQuery} from "../../redux/appQueryV1";



const MessageComponent = (): JSX.Element => {
    const activeContactValue = useAppSelector(selectActiveContact);
    // @ts-ignore
   const { data, error, isLoading}=useGetAllActiveContactMessageQuery(activeContactValue);
    const dispatch = useAppDispatch();
    useEffect(()=>{
        if (Object.keys(activeContactValue).length>0){
            console.log("sajgfdasghgdsa",data)
        }
    }, [activeContactValue])

    return (
        <Wrapper>
            <MessageComponentHeader activeContact={activeContactValue}/>
            <MessageComponentBody/>
            <MessageComponentInput/>
        </Wrapper>
    );
}


export const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
`;

export default MessageComponent;