import styled from "styled-components";
import {Button, Form, InputGroup, Row, Col, Card} from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';

export const MessagingWrapper = styled(Row)`
  margin: 0 auto;
  width: 100%;
`;

export const MessagingInfoColumn = styled(Col)`
  padding: 0;
  @media only screen and (max-width: 1200px) {
    display: none;
  }
`;

export const MessagingMessageColumn = styled(Col)`
  padding: 0;
`;

//Messaging index
export const MessagesIndexContainer = styled(Card)`
  height: 100vh;
  border: none;
  border-radius: 0;
  @media only screen and (max-width: 768px) {
    padding: 0;
  }
`;
export const MessagesIndexHeader = styled(Card.Header)`
  border: none;
  height: 5rem;
`;
export const MessagesIndexBody = styled(Card.Body)`
  border: none;
`;
export const MessagesIndexFooter = styled(Card.Footer)`
  border: none;
  height: fit-content;
  @media only screen and (max-width: 768px) {
    padding: 0 0.5rem 0 0.5rem;
  }
`;

// Header Styles
export const MessagesHeaderContainer = styled(Row)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding-top: 0.5rem;
  padding-right: 3rem;
  padding-left: 3rem;
  @media only screen and (max-width: 768px) {
    padding: 1rem 0 0 0;
  }
`;
export const MessagesHeaderColumn = styled(Col)`

`;
export const MessagesHeaderUtilities = styled.div`
  text-align: end;
  padding: 1rem 1rem 0 0;
  margin-bottom: 1rem;
  @media only screen and (max-width: 768px) {
    padding: 0;
  }
`;
export const HeaderProfileContainer = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
`;
export const HeaderProfileImage = styled.img`
  margin: 0 0.2rem 0 0;
  width: 2.5rem;
  height: 2.5rem;
  @media only screen and (max-width: 1200px) {
    width: 2rem;
    height: 2rem;
    margin: 0;
    padding: 0;
  }
`;
export const HeaderProfileEmail = styled.h6`
  margin: 0 1rem 0 1rem;
  padding: 0.5rem 0 0 0;
  @media only screen and (max-width: 750px) {
    display: none;
  }
`;
export const HeaderButtons = styled(Button)`
  margin: 0 0.2rem 0 0.2rem;
  @media only screen and (max-width: 768px) {
    margin: 0 0.1rem 0 0.1rem;
  }
`;
// Body Styles
export const MessagesBodyRow = styled(Row)`

`;
export const MessagesBodyColumn = styled(Col)`

`;
// @ts-ignore
export const MessageBodyWrapper = styled(InfiniteScroll)`
  background: transparent;
  max-height: calc(100vh - 10rem);
  @media only screen and (max-width: 768px) {
    max-height: calc(100vh - 10rem);
  }
`;

export const MessagesContainer = styled.div`
  background: transparent;
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const EmptyDiv = styled.div`
  max-height: 75vh;
  height: 75vh
`;

/*export const MessageContainer = styled.div`
  width: 100%;
  padding: 0 0 0 0;
  display: flex;
  flex-direction: column;
`;*/


//Message input section styles

export const InputButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 90% 10%;
  grid-gap: 5px;
  @media only screen and (max-width: 768px) {
    grid-template-columns: auto auto;
    grid-gap: 2px;
  }
`;

export const InputContainer = styled.div`
  display: grid;
  grid-template-columns: 10% auto;
  padding: 0;
  /*align-items: center;*/
  height: fit-content;
`;

export const StyledInput = styled(Form.Control)`
  width: 99%;
  height: 2.5rem;
  @media only screen and (max-width: 768px) {
    width: 99%;
  }
`;

export const SendButton = styled(Button)`
  @media only screen and (max-width: 768px) {
    padding: 0;
    margin: 0 0 0 0.5rem;
    height: 2.5rem;
    width: 4rem;
  }
`;

export const EmojisButton = styled(Button)`
  padding: 0 1rem 0 1rem;
  margin: 0 0.5rem 0 0;
  @media only screen and (max-width: 768px) {
    padding: 0;
    margin: 0 0 0 0;
    height: 2.5rem;
  }
`;

//Messaging bubbles

export const StyledCommentReceiver = styled(Card)`
  width: auto;
  max-width: 70%;
  padding: 0.5rem 0.875rem;
  position: relative;
  word-wrap: break-word;
  align-self: flex-start;
  color: white;
  margin: 0.5rem 0;
  border: none;
  background-color: #A3B18A;
  border-radius: 0;
  @media only screen and (max-width: 768px) {
    max-width: 85%;
  }
`;
export const StyledCommentSender = styled(Card)`
  width: auto;
  max-width: 70%;
  padding: 0.5rem 0.875rem;
  position: relative;
  word-wrap: break-word;
  align-self: flex-end;
  color: white;
  border: none !important;
  border-radius: 0;
  margin: 0.5rem 0;
  background-color: #3A5A40;
  @media only screen and (max-width: 768px) {
    max-width: 85%;
  }
`;
export const StyledCommentRow = styled(Card.Body)`
  padding: 0
`;
export const MessagesBubbleBodyHeader = styled(Card.Header)`
  border: none;
  height: fit-content;
  background-color: transparent;
  color: #fff;
  padding: 0 0.5rem;
  font-size: 0.8rem;
  font-weight: bold;
  margin-bottom: 0.3rem;
`;
export const MessagesBubbleBody = styled(Col)`
  padding: 0.5rem;
`;
export const MessagesBubbleBodyII = styled(Col)`
  padding: 0.5rem;
`;
export const MessagesBubbleFooter = styled(Card.Footer)`
  border: none;
  height: fit-content;
  background-color: transparent;
  color: #fff;
  padding: 0 0.5rem;
  margin-top: 0.3rem;
`;
export const StyledMessageTime = styled.p`
  margin: 0;
  font-size: 0.5rem;
  font-weight: 500;
  text-align: right;
`;
export const StyledMessageContentSpan = styled.p`
  margin: 0;
`;
