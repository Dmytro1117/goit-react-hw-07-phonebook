import PropTypes from 'prop-types';
import './ContactList.module.css';
import { useSelector } from 'react-redux';
import { getFilter } from '../../redux/filterSlice';
import {
  useGetContactsQuery,
  useDeleteContactMutation,
} from '../../redux/contactsSlice';

export const ContactList = () => {

  const { data: contacts } = useGetContactsQuery();
  const [deleteContact, { isLoading }] = useDeleteContactMutation();
 
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
          <li key={id}>
            <p>
              {name}: {phone}
            </p>
            <button type="button" onClick={() => deleteContact(id)}>
              {isLoading ? 'Vaiting' : 'Delete'}
            </button>
          </li>
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
