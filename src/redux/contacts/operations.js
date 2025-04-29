import axios from 'axios';
import { addContact as addContactToStore, setContacts, deleteContact as deleteContactFromStore } from './slice';

axios.defaults.baseURL = 'https://connections-api.goit.global';

// Yeni kişi ekleme
export const addContact = (contact) => async (dispatch) => {
    try {
        const response = await axios.post('/contacts', contact);
        dispatch(addContactToStore(response.data));
    } catch (error) {
        console.error('Error adding contact:', error);
    }
};

// Kişileri listeleme
export const getContacts = () => async (dispatch) => {
    try {
        const response = await axios.get('/contacts');
        dispatch(setContacts(response.data));
    } catch (error) {
        console.error('Error fetching contacts:', error);
    }
};

// Kişi silme
export const deleteContact = (id) => async (dispatch) => {
    try {
        await axios.delete(`/contacts/${id}`);
        dispatch(deleteContactFromStore(id));
    } catch (error) {
        console.error('Error deleting contact:', error);
    }
};
