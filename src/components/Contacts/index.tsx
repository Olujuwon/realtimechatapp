import React, {useState} from "react";
import {contactType} from "../../types/Contact/contact";
import {useAppDispatch} from "../../hooks/reduxHooks";

import "../../css/contacts.scss";
import AddNewContact from "./AddNewContact";
import {mainUserUid} from "../../redux/userSlice";
import {makeContactActive} from "../../redux/contactSlice";
import {useGetAllContactsBelongingToUserQuery, useCreateNewContactMutation} from "../../redux/appQueryV1";
import LatestContactMessageTime from "./LatestContactMessageTime";
import NewMessageAlert from "./NewMessageAlert";
import {Button, Col, FloatingLabel, Form, ListGroup, Row, Modal, Spinner} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircle} from "@fortawesome/free-solid-svg-icons";
import {debounce} from "lodash";
import UserOnline from "./UserOnline";


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
    let [createContactFormData, setCreateContactFormData] = useState<Array<{label: string, value: string}>>([]);
    const [isCreateNewContactSuccess, setIsCreateNewContactSuccess] = useState<boolean>(false);
    const [createNewContact] = useCreateNewContactMutation();

    // @ts-ignore
    let {data, error, isLoading} = useGetAllContactsBelongingToUserQuery();
    if (error) return <Spinner animation="border" />;

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

    const _handleOnChangeFormElement = (event:React.ChangeEvent<HTMLInputElement>)=>{
        const label=event.currentTarget.name;
        const value=event.currentTarget.value;
        createContactFormData = [...createContactFormData];
        debounce(()=>createContactFormData.push({label:label, value:value}),2000,{leading: true})
        //createContactFormData.push({label:label, value:value});
        setCreateContactFormData(createContactFormData);
        console.log("VAlII", createContactFormData );
    }


    const _handleAddContactClick = () => {
        // @ts-ignore
       /* event.preventDefault();*/
        // @ts-ignore
        console.log("VAl", );
        /*let contact: contactType = {
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
        setTimeout(() => setIsModalOpen(false), 2000)*/
    }

    return (
        <div className="container-fluid bg-secondary overflow-scroll vh-100">
            <Row className="row">
                <h2>Messages</h2>

                <Form>
                    <Row>
                        <Col>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Search Contacts"
                                className="mb-2"
                            >
                                <Form.Control placeholder="Search Contacts" type="text"
                                              className="my-2"/>
                            </FloatingLabel>
                        </Col>
                    </Row>
                </Form>
                <Button variant="secondary" size="sm" onClick={() => showModal()} className="my-2">
                    Add new contact
                </Button>
            </Row>
            <ListGroup as="ul">
                {isLoading ? null : data.map((contact: contactType, index: number) => {
                    return (
                        <ListGroup.Item action className="border-0" onClick={() => _handleOnClickContact(contact)}>
                            <div className="float-end">
                                <LatestContactMessageTime contactUid={contact.uid}/>
                                <NewMessageAlert contactUid={contact.uid}/>
                            </div>
                            <div className="d-flex">
                                <img
                                    src={contact.profileImg}
                                    className="rounded-circle me-1"
                                    alt={contact.name}
                                    width="40"
                                    height="40"
                                />
                                <div className="flex-grow-1 ms-3">
                                    {contact.name}
                                    <UserOnline/>
                                </div>
                            </div>
                        </ListGroup.Item>
                    )
                })}
            </ListGroup>
            <Modal show={isModalOpen} onHide={closeModal}>
                <Modal.Body><AddNewContact onChangeFormElement={_handleOnChangeFormElement} onSubmit={_handleAddContactClick}
                                           success={isCreateNewContactSuccess}/></Modal.Body>
            </Modal>
        </div>
    );
}

export default Contacts;