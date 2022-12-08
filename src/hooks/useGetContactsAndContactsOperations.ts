import {useEffect, useCallback} from 'react';
import {contactType} from "../types/Contact/contact";
import {useAppDispatch, useAppSelector} from "./reduxHooks";
import {
    makeContactActive,
    selectActiveContact,
} from '../redux/contactSlice';

function useGetContactsAndContactsOperations() {
    const dispatch = useAppDispatch();
    const activeContact = useAppSelector(selectActiveContact);

    const setContactAsActive = useCallback((contact: contactType) => {
        dispatch(makeContactActive(contact));
    }, [activeContact]);


    return {activeContact, setContactAsActive};
}

export default useGetContactsAndContactsOperations;