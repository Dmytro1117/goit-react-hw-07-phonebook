import {
  useDeleteContactMutation,
} from '../../redux/contactsSlice';


export const ContactListItem = ( { id, name, phone }) => {
    const [deleteContact, { isLoading: isDeleiting } ] = useDeleteContactMutation();
    return (
        <li>
            <p>
              {name}: {phone}
            </p>
            <button type="button" onClick={() => deleteContact(id)}>
              {isDeleiting ? 'Vaiting' : 'Delete'}
            </button>
          </li>
     
 )
}