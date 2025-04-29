import { createSlice } from '@reduxjs/toolkit';

const contactsSlice = createSlice({
    name: 'contacts',
    initialState: [],
    reducers: {
        setContacts(state, action) {
            return action.payload; // Tüm listeyi güncelle
        },
        addContact(state, action) {
            state.push(action.payload); // Yeni kişi ekle
        },
        deleteContact(state, action) {
            return state.filter(contact => contact.id !== action.payload); // ID'ye göre sil
        },
    },
});

export const { setContacts, addContact, deleteContact } = contactsSlice.actions;
export default contactsSlice.reducer;
