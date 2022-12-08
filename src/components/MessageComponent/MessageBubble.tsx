import React from 'react';
import {Button, Comment} from "antd";
import styled from "styled-components";

type componentProps = {
    commentType: String,
    content: String
}

const MessageBubble = ({commentType, content}: componentProps): JSX.Element => {
    if (commentType === "to") {
        return (
            <StyledCommentReceiver
                content={content}/>
        )
    } else {
        return (
            <StyledCommentSender
                content={content}/>
        )
    }
}

export const StyledCommentReceiver = styled(Comment)`
  background-color: white;
  max-width: 75%;
  padding: 0.5rem 0.875rem;
  position: relative;
  word-wrap: break-word;
  align-self: flex-start;
  color: black;
  margin: 0.2rem;
  border-top-left-radius: 0.2rem 0.2rem;
  border-top-right-radius: 0.2rem 0.2rem;
  border-bottom-left-radius: 0.2rem 0.2rem;
  border-bottom-right-radius: 0.5rem 0.5rem;
`;

export const StyledCommentSender = styled(Comment)`
  background-color: grey;
  border-radius: 1.15rem;
  max-width: 75%;
  padding: 0.5rem 0.875rem;
  position: relative;
  word-wrap: break-word;
  align-self: flex-end;
  color: white;
  margin: 0.2rem;
  border-top-left-radius: 0.2rem 0.2rem;
  border-top-right-radius: 0.2rem 0.2rem;
  border-bottom-left-radius: 0.5rem 0.5rem;
  border-bottom-right-radius: 0.2rem 0.2rem;
`;

export default MessageBubble;