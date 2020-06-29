import React, { useReducer } from "react";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
    GET_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT,
    UPDATE_CONTACT,
    SET_CURRENT,
    SET_FIELD,
    CLEAR_FIELD,
    CLEAR_CURRENT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR
} from "../types";
import axios from "axios";

const ContactState = props => {
    const initialState = {
        contacts: [],
        current: null,
        loading: true,
        error: null,
        search: null
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    // Get Contacts
    const getContacts = async () => {
        try {
            const res = await axios.get('/api/contacts');
            dispatch({
                type: GET_CONTACTS,
                payload: res.data
            });
        }
        catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.data.msg
            });
        }
    };

    // Add Contact
    const addContact = async contact => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const res = await axios.post('/api/contacts', contact, config);
            dispatch({
                type: ADD_CONTACT,
                payload: res.data
            });
        }
        catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.data.msg
            });
        }

    };

    // Update Contact
    const updateContact = async contact => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const res = await axios.put(`/api/contacts/${contact._id}`, contact, config);
            dispatch({
                type: UPDATE_CONTACT,
                payload: res.data
            });
        }
        catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.data.msg
            });
        }
    };

    // Delete Contact
        const deleteContact = async id => {
            try {
                await axios.delete(`/api/contacts/${id}`);
                dispatch({
                    type: DELETE_CONTACT,
                    payload: id
                });
            }
            catch (err) {
                dispatch({
                    type: CONTACT_ERROR,
                    payload: err.response.data.msg
                });
            }

        };

    // Set Current Contact
    const setCurrent = contact => {
        dispatch({ type: SET_CURRENT, payload: contact });
    };

    // Set Search Field
    const setField = text => {
        dispatch({ type: SET_FIELD, payload: text });
    };

    // Clear Search Field
    const clearField = () => {
        dispatch({ type: CLEAR_FIELD });
    };

    // Clear Current Contact
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    };

    // Filter Contacts
    const filterContacts = text => {
        dispatch({ type: FILTER_CONTACTS, payload: text });
    };

    // Clear Filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    };

    return (
        <ContactContext.Provider
        value={{contacts: state.contacts,
                current: state.current,
                loading: state.loading,
                error: state.error,
                search: state.search,
                getContacts,
                addContact,
                updateContact,
                deleteContact,
                setCurrent,
                setField,
                clearField,
                clearCurrent,
                filterContacts,
                clearFilter}}>
            { props.children }
        </ContactContext.Provider>
    )
};

export default ContactState;