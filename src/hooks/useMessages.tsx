import {useEffect, useState, useCallback} from "react";
import {SAMPLECONTACTS} from "../sampledata/contactsSampleData";

const useMessagesData = ()=>{
    const [getContacts, setGetContacts] = useState<any>([]);
    const [activeContact, setActiveContact] = useState<any>({});

    const _getContacts = useCallback(()=>{
        setGetContacts(SAMPLECONTACTS);
    }, [])

    const _setActiveContacts = useCallback(()=>{
        setGetContacts(SAMPLECONTACTS);
    }, [])
}
