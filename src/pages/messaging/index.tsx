import React from 'react';
import MessageComponent from "../../components/MessageComponent";
import Contacts from "../../components/Contacts";
import {
    Card,
    Col,
    Row,
} from "react-bootstrap";

function Messaging() {
    return (
        <React.Fragment>
            <Card>
                <Row className="g-0">
                    <Col lg={5} xl={3} className="border-end">
                        <Contacts/>
                    </Col>
                    <Col Col lg={7} xl={9}>
                        <MessageComponent/>
                    </Col>
                </Row>
            </Card>
        </React.Fragment>
    );
}


export default Messaging;