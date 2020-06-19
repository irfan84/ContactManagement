import React, {useContext, useState, useEffect} from 'react';
import ContactContext from '../../context/contact/contactContext'


const ContactFilter = () => {
    const contactContext = useContext(ContactContext);
    const { filtered, filterContacts, clearFilter } = contactContext;

    const [formData, setFormData] = useState({
        text: ''
    });

    const { text } = formData;

    useEffect(() => {
        if(filtered === null){
            setFormData({
                text:''
            })
        }
    }, [filtered]);

    const onChange = e => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        });
        if(text !== null){
            filterContacts(text);
        }
        else{
            clearFilter();
        }
    };

    return (
        <div>
        <form>
            <input type="text" name="text" placeholder="Filter Contacts..." onChange={onChange} />
        </form>
        </div>
     )
};

export default ContactFilter;