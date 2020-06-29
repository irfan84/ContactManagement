import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ContactContext from "../../context/contact/contactContext";
import ContactItem from "./ContactItem";

const Contacts = () => {
    const contactContext = useContext(ContactContext);

    const { getContacts, contacts, loading, search } = contactContext;

    useEffect(() => {
        getContacts();
        // eslint-disable-next-line
    },[]);

    if (search !== null && contacts.length === 0) {
        return <h4>No Contact Found</h4>
    }
    else if  (!loading && contacts.length === 0) {
    return <h4>Please add a contact</h4>
    }

    return (
        <Fragment>
            <TransitionGroup>
            {contacts.map(contact => (
                <CSSTransition key={contact._id} timeout={500} classNames="item">
                <ContactItem contact={contact} />
                </CSSTransition>))}
            </TransitionGroup>
        </Fragment>
     )
};

export default Contacts;