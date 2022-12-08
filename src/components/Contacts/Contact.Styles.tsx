import styled from "styled-components";
import {Avatar, Typography, Input, List} from "antd";

const {Title, Text} = Typography;
const {Search} = Input;

export const ContactsSectionHeaderContainer = styled.div`
    padding: 1rem 0 0 1.5rem
  
`;

export const ContactsSectionHeaderStyledTitle = styled(Title)`
    font-weight: 800;
    color: white !important;
    margin: 0 0 1rem 0 !important;
`;

export const ContactsSectionHeaderStyledSearch = styled(Search)`
    width: 80%;
    height: 45px !important
`;

export const ContactsSectionHeaderStyledListItem = styled(List.Item)`
    padding-left: 1.5rem !important;
    max-height: 75vh;
  overflow: scroll;
`;

export const ComponentListExtraWrapper = styled.div`
  display: grid;
  grid-template-rows: auto auto;
`;


//Probably delete them after we started to use List to display contacts

export const StyledTitle = styled(Title)`
  text-align: left;
  font-size: 1rem !important;
  margin-bottom: 0 !important;
`;

export const StyledText = styled(Text)`
  text-align: left;
`;

export const StyledTextII = styled(Text)`
  text-align: left;
  font-size: 0.7rem !important;
  font-weight: 600
`;

export const StyledAvatar = styled(Avatar)`
  color: red;
`;

export const StyledAddNewText = styled(Text)`
  display: inline-block;
  margin-top: 0.5rem;
  cursor: pointer;
`;
