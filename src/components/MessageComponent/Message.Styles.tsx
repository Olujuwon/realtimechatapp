import styled from "styled-components";
import {Avatar, Typography} from "antd";
import {CheckCircleFilled} from "@ant-design/icons";
import {Button, Form, InputGroup} from 'react-bootstrap';

const {Title, Text} = Typography;


// Header Styles
export const MessagesHeaderContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const MessagesHeaderUtilities = styled.div`
  text-align: end;
  padding: 1rem 1rem 0 0;
  margin-bottom: 1rem;
`;

export const HeaderTitleContainer = styled.div`
  align-self: center;
`;

export const StyledAvatar = styled(Avatar)`
  align-self: center;
  margin-left: 1rem
`;

export const StyledTitle = styled(Title)`
  text-align: left;
  font-size: 1rem !important;
  margin-bottom: 0 !important;
`;

export const StyledTextII = styled(Text)`
  text-align: left;
  font-size: 0.7rem !important;
  font-weight: 600
`;

export const StyledOnlineIcon = styled(CheckCircleFilled)`
  color: green;
`;

// Body Styles
export const MessageBodyWrapper = styled.div`
  
  overflow: scroll;
  background: transparent;
  padding: 0 1.5rem 0 1.5rem;
`;

export const EmptyDiv = styled.div`
  max-height: 75vh;
  height: 75vh
`;

export const MessageContainer = styled.div`
  width: 100%;
  height: fit-content;
  padding: 0 0 0 0;
  display: flex;
  flex-direction: column;
`;


//Message input section styles

export const InputButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 90% 10%;
  grid-gap: 5px;
`;

export const InputContainer = styled.div`
  border-top: 0.5px silver solid;
  display: grid;
  grid-template-columns: 5% auto;
  padding: 0 4rem;
  align-items: center;
`;

export const StyledInput = styled(Form.Control)`
  width: 99%;
  margin-left: 0.5rem;
  height: 2.5rem;
`;
