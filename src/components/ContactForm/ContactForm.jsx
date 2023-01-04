import { useState } from 'react';
import PropTypes from 'prop-types';
import './ContactForm.module.css';
import {
  useGetContactsQuery,
  useAddContactMutation,
} from '../../redux/contactsSlice';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


export const ContactForm = () => {
  const [phone, setNumber] = useState('')
  const [name, setName] = useState('')
   const { data: contacts } = useGetContactsQuery();
  const [addContact] = useAddContactMutation();
  
 const handlerChange = (e) => {
    const {name, value} = e.currentTarget
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        break;
    }
 }
  
  const handlerOnSubmit = (e) => {
     e.preventDefault();
    const contact = {
      name,
      phone,
    };

    contacts.some(num => num.name === contact.name.toLowerCase() || num.phone === contact.phone)
      ? Notify.info(`${name} or ${phone} is already in contacts`)
      : addContact(contact) && Notify.success(`${name} added in contacts`);
    
 
    setNumber('')
    setName('')
  }


    return (
      <>
        <form onSubmit={handlerOnSubmit}>
          <input
            placeholder="Number"
            onChange={handlerChange}
            value={phone}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
          

          <input
            placeholder="Name"
            onChange={handlerChange}
            value={name}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
          <button type='submit'>Add contact</button>
        </form>
      </>

    );
  }


  ContactForm.prototypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
};



