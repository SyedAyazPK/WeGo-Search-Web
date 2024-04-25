import React, { useState } from 'react';
import WorkfolioGraph from '../components/workfolio-graph/WorkfolioGraph';
import {
  Avatar,
  Chip,
  Divider,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
import {
  ArrowDownwardOutlined,
  GroupAddOutlined,
  LockOutlined,
  NotificationsOutlined,
  OpenInBrowser,
  OpenInBrowserOutlined,
  VolumeUpOutlined,
} from '@mui/icons-material';
import FriendList from '../components/list/FriendList';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, updateUser } from '../features/userSlice';
import AddServices from '../components/forms/AddServices';
import { toast } from 'react-toastify';

const ProfileApp = () => {
  const user = useSelector(selectUser);
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

  const handleDelete = (service) => {
    let newArr = user?.services?.filter(function (item) {
      return item !== service;
    });
    console.info('You clicked the delete icon.', newArr);
    dispatch(updateUser({ id: user?._id, services: newArr })).then(() =>
      showToast('Services Updated')
    );
  };

  return (
    <div className='grid w-[90%] mx-auto gap-x-8 grid-cols-12 py-8'>
      <div className='col-span-8  shadow-xl '>
        <div className='relative h-[40vh]  '>
          <img
            src={user?.profileImage}
            alt='user-img'
            className='absolute !-z-10 top-0 rounded-tr-2xl rounded-tl-2xl h-[30vh] w-full '
          />
          <Avatar
            src={user?.profileImage}
            className='!absolute !w-40 !border-4 !border-white !h-40 -bottom-0 left-8'
          />
        </div>
        <div className='w-full px-8 py-6 '>
          <div className='flex items-center space-x-1'>
            <Typography className='!text-2xl !font-semibold '>
              {user?.name}
            </Typography>
          </div>
          <p
            className='w-[70%] text-[16px] leading-6  text-uppercase'
            style={{
              letterSpacing: '1px',
            }}
          >
            {user?.role}
          </p>
          {user?.role === 'vendor' && (
            <p className='w-[70%] text-[14px] leading-5 text-gray-700 pt-4  '>
              Services:
              {user?.services?.map((service, index) => (
                <span key={index} className='ml-1'>
                  <Chip
                    label={service}
                    onDelete={() => {
                      handleDelete(service);
                    }}
                  />
                </span>
              ))}
            </p>
          )}
          {/* <div className="flex items-center space-x-3 pt-4 ">
            <p className="text-[17px] leading-5 text-gray-700   ">
              Faisalabad, Punjab, Pakistan
            </p>
          </div> */}
          <p className='w-[70%] text-[14px] leading-5 text-gray-700 pt-4  '>
            {user?.friendId?.length} Friends
          </p>
          {user?.role === 'vendor' && (
            <div className='w-full my-8'>
              <AddServices />
            </div>
          )}

          {/* <div className="flex items-center space-x-4 pt-4">
            <button className="bg-[#005885] px-6 py-2 rounded-3xl flex items-center space-x-1">
              <GroupAddOutlined className="text-white" />
              <p className="text-white">Connect</p>
            </button>
            <button className="border-2 border-[#005885] px-6 py-2 rounded-3xl flex items-center space-x-1">
              <LockOutlined className="text-[#005885]" />
              <p className="text-[#005885] font-bold">Message</p>
            </button>
          </div> */}
        </div>
      </div>
      <div className='col-span-4 '>
        <WorkfolioGraph user={user} />
      </div>
    </div>
  );
};

export default ProfileApp;
