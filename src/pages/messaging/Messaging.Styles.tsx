import styled from "styled-components";
import {Avatar, Typography} from "antd";

const {Title, Text} = Typography;


export const MessagesSection = styled.div`
  width: 100%;
`;

export const ContactsSection = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: 17% auto
`;

export const NavigationSection = styled.div`
  width: 100%;
`;

// Create a Wrapper component that'll render a <section> tag with some styles
export const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: grid;
  grid-template-columns: 8% 25% auto;
  grid-gap: 0.2rem;
`;

