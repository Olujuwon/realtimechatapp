import React from 'react';
import {Button, Comment} from "antd";
import styled from "styled-components";
import moment from "moment";
import {
    Card,
    Col,
    Row,
} from "react-bootstrap";
import avatar1 from "../../assets/img/avatars/avatar.jpg";
import avatar2 from "../../assets/img/avatars/avatar-2.jpg";

type componentProps = {
    commentType: string,
    content: string,
    messagesTime: any,
    sender: string,
}

const MessageBubble = ({commentType, content, messagesTime, sender}: componentProps): JSX.Element => {
    const now = moment();
    // @ts-ignore
    messagesTime = moment(new Date(messagesTime));
    const WhichBubble = () => {
        if (commentType === "to") {
            return (
                <StyledCommentReceiver className="">
                    <Row>
                        <Col lg={1} xl={2}><img
                            src={avatar1}
                            className="rounded-circle me-1"
                            alt="jhkfdhgkfj"
                            width="30"
                            height="30"
                        />
                            <p
                                className="text-muted small text-nowrap mt-2">{moment(now).isSame(messagesTime, "day") ? "Today" :
                                messagesTime.from(now)}</p>
                        </Col>
                        <Col lg={5} xl={10}><span className="">{content}</span></Col>
                    </Row>
                </StyledCommentReceiver>
            );
        } else {
            return (
                <StyledCommentSender className="">
                    <Row>
                        <Col lg={1} xl={2}><img
                            src={avatar2}
                            className="rounded-circle me-1"
                            alt="jhkfdhgkfj"
                            width="30"
                            height="30"
                        />
                            <p
                                className="text-muted small text-nowrap mt-1">{moment(now).isSame(messagesTime, "day") ? "Today" :
                                messagesTime.from(now)}</p>
                        </Col>
                        <Col lg={5} xl={10}><span>{content}</span></Col>
                    </Row>
                </StyledCommentSender>
            )
        }
    }
    return <WhichBubble/>;
}

export const StyledCommentReceiver = styled(Card)`
  background-color: #A3B18A;
  max-width: 49.5%;
  padding: 0.5rem 0.875rem;
  position: relative;
  word-wrap: break-word;
  align-self: flex-start;
  color: white;
  margin: 0.2rem;
  border:none;
  border-top-left-radius: 0.2rem 0.2rem;
  border-top-right-radius: 0.2rem 0.2rem;
  border-bottom-left-radius: 0.2rem 0.2rem;
  border-bottom-right-radius: 0.5rem 0.5rem;
`;

export const StyledCommentSender = styled(Card)`
  background-color: #3A5A40;
  border-radius: 1.15rem;
  max-width: 49.5%;
  padding: 0.5rem 0.875rem;
  position: relative;
  word-wrap: break-word;
  align-self: flex-end;
  color: white;
  border:none;
  margin: 0.2rem;
  border-top-left-radius: 0.2rem 0.2rem;
  border-top-right-radius: 0.2rem 0.2rem;
  border-bottom-left-radius: 0.5rem 0.5rem;
  border-bottom-right-radius: 0.2rem 0.2rem;
`;

export default MessageBubble;