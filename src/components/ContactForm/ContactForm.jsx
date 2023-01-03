import { useState } from 'react';
import PropTypes from 'prop-types';
import './ContactForm.module.css';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts, addContact } from '../../redux/slice';



export const ContactForm = () => {
  const [number, setNumber] = useState('')
  const [name, setName] = useState('')
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();
  
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
  
  const handlerFromForm = (e) => {
     e.preventDefault();
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    contacts.some(num => num.name === contact.name.toLowerCase() || num.number === contact.number)
      ? Notify.info(`${name} or ${number} is already in contacts`)
      : dispatch(addContact({contact}));
  
    setNumber('')
    setName('')
  }


    return (
      <>
        <form onSubmit={handlerFromForm}>
          <input
            placeholder="Number"
            onChange={handlerChange}
            value={number}
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
