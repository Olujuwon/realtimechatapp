import React from 'react';
import MessageComponent from "../../components/MessageComponent";
import Contacts from "../../components/Contacts";
import {
     Container,
} from "react-bootstrap";

function Messaging() {
    return (
        <div className="container-fluid p-0">
            <div className="row">
                <div className="col p-0">
                    <Contacts/>
                </div>
                <div className="col-9 p-0">
                    <MessageComponent/>
                </div>
            </div>
        </div>
    );
}


export default Messaging;