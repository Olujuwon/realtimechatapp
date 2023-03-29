import React from "react";
import {Row} from "react-bootstrap";
import {
    StyledSidebarInfoMessageHeading,
    SidebarContainer,
    StyledSidebarInfoMessage,
    StyledTitle, StyledSidebarVersion
} from "./SideBar.Styles";

const SideBar: React.FC = (): JSX.Element => {
    // @ts-ignore
    const APP_VERSION: string = process.env.REACT_APP_VERSION;
    return (
        <SidebarContainer>
            <StyledTitle>Realtime Chat Application</StyledTitle>
            <StyledSidebarVersion>version {APP_VERSION} </StyledSidebarVersion>
            <StyledSidebarInfoMessageHeading>About</StyledSidebarInfoMessageHeading>
            <StyledSidebarInfoMessage>
                Frontend messaging application interface integrated with OpenAI's ChatGPT to
                simulate realtime chat or convversation
            </StyledSidebarInfoMessage>
            <StyledSidebarInfoMessageHeading>Features</StyledSidebarInfoMessageHeading>
            <StyledSidebarInfoMessage>
                <ul>
                    <li>Simple user registeration and login</li>
                    <li>Fully customizable</li>
                    <li>Cloud storage and backup</li>
                    <li>Data security and encryption</li>
                </ul>
            </StyledSidebarInfoMessage>
            <StyledSidebarInfoMessageHeading>Future developments</StyledSidebarInfoMessageHeading>
            <StyledSidebarInfoMessage>
                <ul>
                    <li>Emojis</li>
                    <li>Audio and video calls</li>
                    <li>Push notification</li>
                    <li>Dark and light modes</li>
                    <li>Integration to websites as chatbot</li>
                    <li>Cross-platform i.e mobile applications for iOS and Android</li>
                </ul>
            </StyledSidebarInfoMessage>
        </SidebarContainer>
    );
}
export default SideBar;