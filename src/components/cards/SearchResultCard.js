import { FaTrash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { deleteSearchHistory, searchHistory } from '../../features/searchSlice';
import { toast } from 'react-toastify';

export const SearchResultCard = ({ title, id }) => {
  const dispatch = useDispatch();

  function showToast(msg) {
    return toast(msg, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      toastId: 'success',
    });
  }

  return (
    <div
      className='flex w-full justify-between p-4 my-4'
      style={{ backgroundColor: '#F4F4F4' }}
    >
      <div className='w-full flex'>
        <b>{title}</b>
      </div>
      <div
        className='flex items-end cursor-pointer'
        onClick={() =>
          dispatch(deleteSearchHistory(id))
            .then(() => dispatch(searchHistory()))
            .then(() => showToast('Search Record deleted'))
        }
      >
        <FaTrash />
      </div>
    </div>
  );
};
