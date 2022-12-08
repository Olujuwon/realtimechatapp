import styled from "styled-components";
import {CalendarFilled, ContactsFilled, HomeFilled, MessageFilled, RocketFilled} from "@ant-design/icons";

// Create a Wrapper component that'll render a <section> tag with some styles

export const HomeItem = styled(HomeFilled)`
  font-size: 1.3rem;
  align-self: baseline;
  color: white;
  cursor: pointer;
`;

export const MessageItem = styled(MessageFilled)`
  font-size: 1.3rem;
  align-self: baseline;
  color: white;
  cursor: pointer;
`;

export const CalendarItem = styled(CalendarFilled)`
  font-size: 1.3rem;
  align-self: baseline;
  color: white;
  cursor: pointer;
`;

export const ContactsItem = styled(ContactsFilled)`
font-size: 1.3rem;
  align-self: baseline;
  color: white;
  cursor: pointer;
`;

export const MainNavSectionWrapper = styled.div`
  display: grid;
  grid-template-rows: auto
`;

export const LogoSection = styled(RocketFilled)`
  font-size: 3rem;
    padding: 1.8rem;
    color: white;
`;

// Create a Wrapper component that'll render a <section> tag with some styles
export const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: grid;
  grid-template-rows: 25% 45% 30%;
  grid-gap: 1rem;
  background-color: black
`;