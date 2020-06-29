import {
    GET_CONTACTS,
    ADD_CONTACT,
    UPDATE_CONTACT,
    CLEAR_CURRENT,
    DELETE_CONTACT,
    SET_CURRENT,
    FILTER_CONTACTS,
    CONTACT_ERROR,
    SET_FIELD, CLEAR_FIELD
} from "../types";

export default (state, action) => {
    const {type, payload} = action;
    switch (type) {

        case GET_CONTACTS:
            return {
                ...state,
                contacts: payload,
                loading: false
            };

        case ADD_CONTACT:
            return {
                ...state,
                contacts: [payload, ...state.contacts],
                loading: false
            };

        case UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map(contact => contact._id === payload._id ? payload : contact),
                loading: false
            };

        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact._id !== payload),
                loading: false
            };

        case SET_CURRENT:
            return {
                ...state,
                current: payload
            };

        case SET_FIELD:
            return {
                ...state,
                search: payload
            };

        case CLEAR_FIELD:
            return {
                ...state,
                search: null,
                loading: false
            };

        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            };

        case FILTER_CONTACTS:
            return {
                ...state,
                contacts: state.contacts.filter(contact => {
                    const regex = new RegExp(`${payload}`, 'gi')
                    return contact.name.match(regex) || contact.email.match(regex);
                })
            };

        case CONTACT_ERROR:
            return {
                ...state,
                error: payload
            };

        default:
            return state;
    }
}