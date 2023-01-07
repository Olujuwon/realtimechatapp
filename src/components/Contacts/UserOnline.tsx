import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircle} from "@fortawesome/free-solid-svg-icons";

const UserOnline = ()=>{
    return(
        <div className="small">
            <FontAwesomeIcon icon={faCircle} className="chat-online small text-success"/>{" "}
            Online
        </div>
    )
}

export default UserOnline;