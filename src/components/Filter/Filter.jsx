import PropTypes from 'prop-types';
import './Filter.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, getFilter } from '../../redux/slice';

export const Filter = () => {
  const dispatch = useDispatch();
  const text = useSelector(getFilter);
  
  const handlerFindContact = e => {
    dispatch(setFilter(e.currentTarget.value));
  }; 

  return (
    <input
    type="text"
    value={text}
    onChange={handlerFindContact}
    placeholder="Find contacts by name"
  />)
  
};


Filter.propTypes = {
  text: PropTypes.string,
  filterInput: PropTypes.func,
};
