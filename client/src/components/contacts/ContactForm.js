import React, {useState, useContext, useEffect} from 'react';
import ContactContext from '../../context/contact/contactContext';


const ContactForm = () => {
    const contactContext = useContext(ContactContext);
    const { addContact, updateContact, clearCurrent, current } = contactContext;

    useEffect(() => {
        if(current !== null){
        setContact(current);
        }
        else {
            setContact({
                id: '',
                name: '',
                email: '',
                phone: '',
                type: 'personal'
            });
        }
    }, [contactContext, current]);

    const [contact, setContact] = useState({
        id: '',
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    });

    const { name, email, phone, type } = contact;

    const onChange = e => setContact({...contact, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        if(current === null){
            addContact(contact);
        }
        else {
            updateContact(contact);
        }
        clearAll();
    };

    const clearAll = e => {
      clearCurrent();
    };

    return (
        <form onSubmit={onSubmit}>
            <h2 className="text-primary">{current ? 'Edit Contact' : 'Add Contact'}</h2>
            <input type="text" placeholder="name" name="name" value={name} onChange={onChange} />
            <input type="text" placeholder="email" name="email" value={email} onChange={onChange} />
            <input type="text" placeholder="phone" name="phone" value={phone} onChange={onChange} />
            <input type="radio" name="type" value='personal' checked={type === 'personal'} onChange={onChange} />{' '}Personal
            <input type="radio" name="type" value='professional' checked={type === 'professional'} onChange={onChange} />{' '}Professional
            <div>
                <input type="submit" value={current ? 'Update Contact' : 'Add Contact'} className="btn btn-primary btn-block" onSubmit={onsubmit} />
            </div>
            {current && (
                <div>
                    <input type="submit" value="Clear" className="btn btn-light btn-block" onClick={clearAll} />
                </div>
            )}
        </form>
     )
};

export default ContactForm;