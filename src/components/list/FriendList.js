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
import { Button, IconButton, ListItemButton } from '@mui/material';
import { addFriend, selectUser } from '../../features/userSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ChatOutlined } from '@mui/icons-material';
import { setRemoteUser } from '../../features/chatSlice';

export default function FriendList({ socket, value }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [bidData, setBidData] = React.useState([]);
  console.log('🚀 ~ file: FriendList.js:20 ~ FriendList ~ bidData:', bidData);

  let { search } = useSelector(selectSearchData);

  socket.on('newBid', (bid) => {
    console.log('🚀 ~ file: FriendList.js:28 ~ socket.on ~ bid:', bid);
    let findAlreadyExist = bidData.findIndex((item) => item._id === bid._id);
    console.log(
      '🚀 ~ file: FriendList.js:29 ~ socket.on ~ findAlreadyExist:',
      findAlreadyExist
    );
    if (bidData.length === 0 || findAlreadyExist === -1) {
      showToast('New Bid Added');
      setBidData([
        ...bidData,
        {
          _id: bid._id,
          price: bid.price,
        },
      ]);
    }

    console.log('BID_________', bid);
  });

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
      {search?.map((item, index) => {
        console.log('🚀 ~ file: FriendList.js:65 ~ {search?.map ~ item:', item);
        const findPersonBid = bidData.find((e) => e._id === item._id);
        console.log(
          '🚀 ~ file: FriendList.js:66 ~ {search?.map ~ findPersonBid:',
          findPersonBid
        );
        return (
          <div
            onClick={() => {
              dispatch(setRemoteUser(item));
              navigate('/chat');
            }}
            className='w-full cursor-pointer'
            key={index}
          >
            <ListItem alignItems='flex-start items-center'>
              <ListItemAvatar>
                {item?.profileImage ? (
                  <img
                    alt={item?.name}
                    src={item?.profileImage}
                    style={{
                      width: '83px',
                      height: '79px',
                      borderRadius: '5px',
                    }}
                    className='mr-2'
                  />
                ) : (
                  <Avatar
                    src={''}
                    style={{
                      width: '83px',
                      height: '79px',
                      borderRadius: '5px',
                    }}
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
                    <br />
                    <div className='flex items-center justify-between'>
                      <b className='text-lg'>
                        {' '}
                        {findPersonBid && `Bid : $ ${findPersonBid.price} `}
                      </b>
                      {findPersonBid && (
                        <IconButton
                          onClick={() => {
                            dispatch(setRemoteUser(item));
                            navigate('/chat');
                          }}
                        >
                          <ChatOutlined />
                        </IconButton>
                      )}
                    </div>
                  </React.Fragment>
                }
              />
              {value != 0 && (
                <Button
                  onClick={() => {
                    dispatch(
                      addFriend({
                        recieverId: item?._id,
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
        );
      })}
    </List>
  );
}
