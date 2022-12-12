import styled from "styled-components";
import {Avatar, Typography} from "antd";
import {CheckCircleFilled} from "@ant-design/icons";

const {Title, Text} = Typography;


// Header Styles
export const ComponentHeaderWrapper = styled.div`
  height: 6.5rem;
  width: 100%;
  background-color: transparent;
  margin: 0.2rem 0 0 0;
  display: grid;
  grid-template-columns: 15% auto;
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

