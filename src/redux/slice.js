import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contact: [],
    filter: '',
  },

  reducers: {
    addContact(state, action) {
      state.contact.push(action.payload.contact);
    },
    deleteContact(state, action) {
      state.contact = state.contact.filter(
        contact => contact.id !== action.payload.id
      );
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['filter'],
};

export const persistedContactsReducer = persistReducer(
  persistConfig,
  contactsSlice.reducer
);

export const { setFilter, addContact, deleteContact } = contactsSlice.actions;
export default contactsSlice.reducer;

export const getContacts = state => state.contacts.contact;
export const getFilter = state => state.contacts.filter;