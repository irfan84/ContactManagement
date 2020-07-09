import React, {useState, useContext, useEffect} from 'react';
import ContactContext from '../../context/contact/contactContext';
import AlertContext from '../../context/alert/alertContext';


const ContactForm = () => {
    const contactContext = useContext(ContactContext);
    const alertContext = useContext(AlertContext);

    const { setAlert } = alertContext;
    const { addContact, updateContact, clearCurrent, current, error, clearErrors } = contactContext;

    useEffect(() => {
    if(error) {
            return error.forEach(error => setAlert(error.msg, 'danger'));
        }
    else if(current !== null) {
            setContact(current);
        }
        else {
            setContact({
                name: '',
                email: '',
                phone: '',
                type: 'personal'
            });
    }
        // eslint-disable-next-line
    }, [error, current]);

    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    });

    const { name, email, phone, type } = contact;

    const onChange = e => setContact({...contact, [e.target.name]: e.target.value});

    const onSubmit = async e => {
        e.preventDefault();
        if(current === null){
            addContact(contact);
        }
        else {
            await updateContact(contact);
        }
        clearErrors();
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