import React, { useContext, useRef } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactFilter = () => {
    const contactContext = useContext(ContactContext);
    const text = useRef('');

    const { filterContacts, getContacts, setField, clearField } = contactContext;

    const onChange = e => {
        if (text.current.value !== '') {
            filterContacts(e.target.value);
            setField(e.target.value);

        } else {
            getContacts();
            clearField();
        }
    };

    return (
        <form>
            <input
                ref={text}
                type='text'
                placeholder='Filter Contacts...'
                onChange={onChange}
            />
        </form>
    );
};

export default ContactFilter;