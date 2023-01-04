import PropTypes from 'prop-types';
import './ContactList.module.css';
import { useSelector } from 'react-redux';
import { getFilter } from '../../redux/filterSlice';
import {
  useGetContactsQuery,
 } from '../../redux/contactsSlice';
import {ContactListItem} from './ContactListItem'

export const ContactList = () => {

  const { data: contacts } = useGetContactsQuery();
  
   const filter = useSelector(getFilter);

  const filtrContacts = () => {
    return contacts.filter(cont =>
      cont.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
  <>
    { contacts && (
    <ul>
      {filtrContacts().map(({ id, name, phone }) => {
        return (
          <ContactListItem  key={id} name={name}  phone={phone} id={id}/>
        );
      })}
        </ul>)}
      </>
  );
}

ContactList.propTypes = {
  deleteContact: PropTypes.func,
  find: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
     }),
  )
};
