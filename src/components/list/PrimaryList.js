import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { selectSearchData } from '../../features/searchSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ListItemButton } from '@mui/material';
import { addFriend, selectUser } from '../../features/userSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function PrimaryList({ socket, value }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  // console.log("🚀 ~ file: PrimaryList.js:17 ~ PrimaryList ~ user:", user);
  const searchText = useSelector(selectSearchData);

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
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {searchText?.search?.map((item, index) => (
        <div className='w-full' key={index}>
          <ListItem alignItems='flex-start items-center'>
            <ListItemAvatar>
              {item?.profileImage ? (
                <img
                  alt={item?.name}
                  src={item?.profileImage}
                  style={{ width: '83px', height: '79px', borderRadius: '5px' }}
                  className='mr-2'
                />
              ) : (
                <Avatar
                  src={''}
                  style={{ width: '83px', height: '79px', borderRadius: '5px' }}
                  className='mr-2'
                />
              )}
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography
                  sx={{ display: 'inline' }}
                  component='span'
                  variant='h6'
                  color='text.primary'
                >
                  {item?.name}
                </Typography>
              }
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component='span'
                    variant='body2'
                    color='text.primary'
                  >
                    {item?.email}
                  </Typography>
                  {'  '}
                  <br />
                  {item?.services?.length > 0
                    ? `Services: ${item?.services.join(', ')}`
                    : ''}
                </React.Fragment>
              }
            />
            {value != 0 && (
              <Button
                onClick={() => {
                  dispatch(
                    addFriend({
                      receiverId: item?._id,
                      senderId: user?._id,
                    })
                  ).then((resp) => {
                    socket.emit('sentFriendRequest', {
                      to: item?._id,
                      from: user?._id,
                    });
                    showToast(resp.payload.message);
                  });
                }}
                variant='outlined'
              >
                Add Friend
              </Button>
            )}
          </ListItem>
          <Divider variant='inset' component='li' />
        </div>
      ))}
    </List>
  );
}
