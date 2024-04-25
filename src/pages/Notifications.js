import React from 'react';
import PrimaryList from '../components/list/PrimaryList';
import PrimaryHeading from '../components/typography/PrimaryHeading';
import SecondaryHeading from '../components/typography/SecondaryHeading';
import NotificationList from '../components/list/NotifcationList';
import { selectSocket } from '../features/chatSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import {
  getNotifications,
  readAllNotifications,
  selectUser,
} from '../features/userSlice';

const Notifications = ({ socket }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  return (
    <div className='py-12 w-full px-6'>
      <div className='flex items-center justify-between w-full'>
        <PrimaryHeading text={'Notification'} provideDivider={false} />
        <Button
          color='primary'
          onClick={() =>
            dispatch(readAllNotifications(user._id)).then(() =>
              getNotifications(user._id)
            )
          }
        >
          Read All Notifications
        </Button>
      </div>

      {/* <SecondaryHeading text={"Today"} /> */}
      <NotificationList socket={socket} />
      {/* <SecondaryHeading text={"Yesterday"} />
      <PrimaryList /> */}
    </div>
  );
};

export default Notifications;
