import styled from "styled-components";
import {
    Button,
    Col,
    FloatingLabel,
    Form,
    ListGroup,
    Row,
    Modal,
    Spinner,
    Alert
} from "react-bootstrap";

export const SidebarContainer = styled(Col)`
  background-color: rgba(0, 0, 0, 0.05);
  height: 100%;
`;
export const StyledSidebarInfoMessage = styled.p`
  height: auto;
  padding: 0.2rem 1rem 0 1rem;
  margin: 0;
`;
export const StyledSidebarInfoMessageHeading = styled.p`
  height: auto;
  padding: 0 1rem 0 1rem;
  margin: 0;
  font-size: 1rem;
  font-weight: bold;
`;
export const StyledSidebarVersion = styled.p`
  height: auto;
  padding: 0 1rem 1rem 1rem;
  margin-top: 0;
  font-size: 0.8rem;
  font-weight: lighter;
`;
export const StyledTitle = styled.h3`
  padding: 1rem 1rem 0 1rem;
  font-size: 1.5rem;
  margin-bottom: 0;
`;



