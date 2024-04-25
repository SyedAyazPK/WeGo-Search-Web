import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PrimaryBtn from '../components/buttons/PrimaryBtn';
import PrimaryTabs from '../components/tabs/PrimaryTabs';
import PrimaryHeading from '../components/typography/PrimaryHeading';
import DragBox from '../components/DragBox';
import { registerUser } from '../features/userSlice';
import LightHeading from '../components/typography/LightHeading';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    password: '',
    email: '',
    role: 'user',
  });

  let latitude;
  let longitude;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      },
      (error) => {
        console.error(`Error: ${error.message}`);
      }
    );
  } else {
    console.error('Geolocation is not supported by this browser.');
  }

  return (
    <DragBox>
      <div className='flex flex-col items-center w-full'>
        <PrimaryHeading text={'Register'} boxStyles='pb-6' />
        <div className='flex sm:flex-row flex-col w-full md:w-[70%] md:mx-auto sm:space-y-0 space-y-4 sm:space-x-6 items-center pb-6'>
          <div onClick={() => setValue(0)}>
            <PrimaryTabs
              text={'Register As User'}
              value={0}
              activeValue={value}
              setValue={setValue}
            />
          </div>
          <div onClick={() => setValue(1)}>
            <PrimaryTabs
              text={'Register As Vendor'}
              value={1}
              activeValue={value}
              setValue={setValue}
            />
          </div>
        </div>
        <div className='w-[70%] flex flex-col space-y-6 pt-6 mx-auto '>
          <TextField
            type='text'
            label='Name'
            fullWidth
            value={form.name}
            onChange={(e) => {
              setForm({
                ...form,
                name: e.target.value,
              });
            }}
          />
          <TextField
            type='text'
            label='Email'
            value={form.email}
            onChange={(e) => {
              setForm({
                ...form,
                email: e.target.value,
              });
            }}
          />
          <TextField
            type='password'
            label='Password'
            value={form.password}
            onChange={(e) => {
              setForm({
                ...form,
                password: e.target.value,
              });
            }}
          />
          <input type='file' name='profile' id='profile' />
          <PrimaryBtn
            text={'Submit'}
            width='75%'
            onClick={() => {
              let updatedData = {};
              if (value == 1) {
                updatedData = {
                  ...form,
                  role: 'vendor',
                  location: {
                    type: 'Point',
                    coordinates: [longitude, latitude],
                  },
                };
              } else {
                updatedData = {
                  ...form,
                  role: value === 0 ? 'user' : 'vendor',
                  location: {
                    type: 'Point',
                    coordinates: [longitude, latitude],
                  },
                };
              }

              dispatch(registerUser(updatedData)).then((resp) => {
                if (resp.payload?.user?._id) {
                  navigate('/home');
                  localStorage.setItem('token', resp.payload?.token);
                }
              });
            }}
          />
          <div className='w-[52%] ml-auto '>
            <LightHeading
              colorMain={'text-[#707070]'}
              textMain={'I Already Have an Account'}
              colorSecondary={'text-black'}
              textSecondary={'Sign in'}
            />
          </div>
        </div>
      </div>
    </DragBox>
  );
};

export default Register;
