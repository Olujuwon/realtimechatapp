import React, {useState} from "react";
import {List, Avatar, Modal, Skeleton} from "antd";
import {contactType} from "../../types/Contact/contact";
import {useAppDispatch} from "../../hooks/reduxHooks";
import {
    ComponentListExtraWrapper, ContactsContainer,
    ContactsSectionHeaderContainer,
    ContactsSectionHeaderStyledListItem,
    ContactsSectionHeaderStyledSearch,
    ContactsSectionHeaderStyledTitle, StyledAddNewText
} from "./Contact.Styles";
import "../../css/contacts.scss";
import {PlusCircleFilled} from "@ant-design/icons";
import AddNewContact from "./AddNewContact";
import {mainUserUid} from "../../redux/userSlice";
import {makeContactActive} from "../../redux/contactSlice";
import {useGetAllContactsBelongingToUserQuery, useCreateNewContactMutation} from "../../redux/appQueryV1";
import LatestContactMessage from "./LatestContactMessage";
import LatestContactMessageTime from "./LatestContactMessageTime";
import NewMessageAlert from "./NewMessageAlert";

/*
* TODO:
*  1. refactor active contact messages in redux to not call firebase and reuse data -- done
*  2. implement online status ui to contact list
*  3. Last message and time of last message - generate another map data and store to state when storing contacmessages key pair
*  4. subscribe to contacts to update when new contact is added
*  5. implement contact crud
* */

const Contacts: React.FC = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isCreateNewContactSuccess, setIsCreateNewContactSuccess] = useState<boolean>(false);
    const [createNewContact] = useCreateNewContactMutation();
    // @ts-ignore
    const {data, error, isLoading} = useGetAllContactsBelongingToUserQuery();
    if (error) return <Skeleton />

    const showModal = () => {
        setIsCreateNewContactSuccess(false);
        setIsModalOpen(true);
    }
    const closeModal = () => {
        setIsModalOpen(false);
        setIsCreateNewContactSuccess(false);
    }

    const _handleOnClickContact = (contact: contactType) => {
        dispatch(makeContactActive(contact));
    }

    const _handleAddContactClick = (values: any) => {
        let contact: contactType = {
            name: values.firstname + " " + values.lastname,
            profileImg: "",
            email: values.email,
            uid: "",
            contacts: [mainUserUid],
            birthday: (new Date()).valueOf(),
            online: false,
            phone: [
                {home: values.phone}
            ]
        }
        createNewContact(contact);
        setIsCreateNewContactSuccess(true);
        setTimeout(()=>setIsModalOpen(false), 2000)
    }

    return (
        <ContactsContainer>
            <ContactsSectionHeaderContainer>
                <ContactsSectionHeaderStyledTitle>Messages</ContactsSectionHeaderStyledTitle>
                <ContactsSectionHeaderStyledSearch size="large" placeholder="Search Contacts"/>
                <StyledAddNewText className="addContact" onClick={() => showModal()}><PlusCircleFilled/> Add new contact</StyledAddNewText>
            </ContactsSectionHeaderContainer>
            <List
                style={{
                    padding: "1rem"
                }}
                itemLayout="vertical"
                dataSource={isLoading ? [] : data}
                renderItem={(contact: contactType, index: number) => {
                    return (<ContactsSectionHeaderStyledListItem className={`contactWrapper${index}`} onClick={() => _handleOnClickContact(contact)}>
                        <List.Item.Meta
                            avatar={<Avatar size={40} src={contact.profileImg}/>}
                            title={contact.name}
                            description={<LatestContactMessage contactUid={contact.uid}/>}
                            className={`list-meta-container`}
                        />
                        <ComponentListExtraWrapper>
                            <LatestContactMessageTime contactUid={contact.uid}/>
                            <NewMessageAlert contactUid={contact.uid}/>
                        </ComponentListExtraWrapper>
                    </ContactsSectionHeaderStyledListItem>);
                }}
            />
            <Modal visible={isModalOpen} onCancel={closeModal} footer={null} centered={true} destroyOnClose={true}>
                <AddNewContact onFinish={_handleAddContactClick} success={isCreateNewContactSuccess}/>
            </Modal>
        </ContactsContainer>
    );
}

export default Contacts;