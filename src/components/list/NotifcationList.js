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
import {
  acceptRequest,
  addFriend,
  getNotifications,
  readNotification,
  rejectRequest,
  selectNotifications,
  selectUser,
} from '../../features/userSlice';
import axios from 'axios';
import axiosInstance from '../../helpers/axiosInstance';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import UserNotificationCard from '../cards/UserNotificationCard';
import UserProfileCard from '../cards/UserProfileCard';

export default function PrimaryList({ socket }) {
  const dispatch = useDispatch();
  // const [notifications, setNotifications] = React.useState([]);
  const [profile, setProfile] = React.useState({});
  const notifications = useSelector(selectNotifications);
  const [service, setService] = React.useState('');

  const user = useSelector(selectUser);
  React.useEffect(() => {
    dispatch(getNotifications(user?._id));
  }, []);
  // const getNotifications = async () => {
  //   const { data } = await axiosInstance.get(
  //     `${process.env.REACT_APP_API_URL}/notifications?to=${user._id}`
  //   );
  //   setNotifications(data);
  //   return data;
  // };

  const [open, setOpen] = React.useState(false);
  const [vendorOpen, setVendorOpen] = React.useState(false);

  const handleClickOpen = (profile) => {
    setProfile(profile);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickVendorOpen = (profile) => {
    setProfile(profile.from);
    setService(profile.service);
    setVendorOpen(true);
  };

  const handleVendorClose = () => {
    setVendorOpen(false);
  };

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {notifications?.map((item, index) => (
        <div
          className={`w-full cursor-pointer ${
            item.isRead && 'bg-[#f1f1f1] border'
          }  `}
          key={index}
        >
          <ListItem
            alignItems='flex-start'
            onClick={() => {
              if (user.role === 'vendor') handleClickVendorOpen(item);
              else handleClickOpen(item.from);
              dispatch(readNotification(item._id)).then(() => {
                dispatch(getNotifications(user._id));
              });
            }}
          >
            <ListItemAvatar>
              <Avatar alt={item?.from?.name} src={item?.from?.profileImage} />
            </ListItemAvatar>
            <ListItemText
              primary={item?.from?.name}
              secondary={
                <React.Fragment>
                  {'  '}
                  {item?.body}
                </React.Fragment>
              }
            />
            {/* <div className="flex flex-col items-center space-y-1">
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  dispatch(
                    acceptRequest({
                      receiverId: user?._id,
                      senderId: item?._id,
                    })
                  );
                }}
              >
                Accept
              </Button>
              <Button
                onClick={() => {
                  dispatch(
                    rejectRequest({
                      receiverId: user?._id,
                      senderId: item?._id,
                    })
                  );
                }}
                variant="outlined"
                color="primary"
              >
                Reject
              </Button>
            </div> */}
          </ListItem>
          <Divider variant='inset' component='li' />
        </div>
      ))}
      <Dialog
        open={vendorOpen}
        onClose={handleVendorClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            <UserProfileCard
              profile={profile}
              service={service}
              socket={socket}
            />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </List>
  );
}
