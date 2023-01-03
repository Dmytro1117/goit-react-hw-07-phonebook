// import { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import './App.module.css';

export const App = () => { 
  return (
      <section>
        <h1>Phonebook:</h1>
        <ContactForm/>
        <h1>Contacts:</h1>
        <Filter/>
        <ContactList/>
      </section>
    );

 };

