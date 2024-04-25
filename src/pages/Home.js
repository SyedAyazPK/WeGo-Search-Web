/**
 * The Home function is a React component that renders a search bar, user profile information, and a
 * list of search results based on the user's input.
 * @returns The Home component is being returned.
 */
import {
  Avatar,
  Button,
  Divider,
  Fab,
  IconButton,
  Paper,
  Rating,
  Select,
  Switch,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import FlexBetween from '../components/reuse-css/FlexBetween';
import { FaHeart, FaMap, FaMicrophoneAlt, FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getServices, selectServices, selectUser } from '../features/userSlice';
import { ChatOutlined, NotificationsOutlined } from '@mui/icons-material';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';
import PrimaryList from '../components/list/PrimaryList';
import {
  searchByRadius,
  searchedText,
  selectSearchData,
} from '../features/searchSlice';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SearchHistory from './SearchHistory';
import 'react-select-search/style.css';
import CreatableSelect from 'react-select/creatable';
import FriendList from '../components/list/FriendList';
import { getMessages, setSocket } from '../features/chatSlice';

// const Search = styled("div")(({ theme }) => ({
//   position: "relative",
//   borderRadius: "55px",
//   backgroundColor: "#c9c9c9",
//   "&:hover": {
//     backgroundColor: "#c9c9c9",
//   },
//   marginLeft: 0,
//   width: "100%",
//   [theme.breakpoints.up("sm")]: {
//     marginLeft: theme.spacing(1),
//     width: "auto",
//   },
// }));

// const SearchIconWrapper = styled("div")(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: "100%",
//   position: "absolute",
//   pointerEvents: "none",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: "inherit",
//   "& .MuiInputBase-input": {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create("width"),
//     width: "100%",
//     // [theme.breakpoints.up("sm")]: {
//     //   width: "12ch",
//     //   "&:focus": {
//     //     width: "20ch",
//     //   },
//     // },
//   },
// }));

const Home = ({ socket }) => {
  const [value, setValue] = useState(1);
  const { token, ...user } = useSelector(selectUser);
  const services = useSelector(selectServices);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(user?.token);

  const [searchValue, setSearchValue] = useState('');
  console.log(user);
  useEffect(() => {
    socket.emit('add-user', user?._id);
    socket.emit('joinRoom', user?._id);
    dispatch(getServices());
  }, []);

  socket.on('sendNotification', (data) => {
    console.log(data);
    // showToast(data.body);
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

  const colourOptions = [
    { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
    { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
    { value: 'purple', label: 'Purple', color: '#5243AA' },
    { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
    { value: 'orange', label: 'Orange', color: '#FF8B00' },
    { value: 'yellow', label: 'Yellow', color: '#FFC400' },
    { value: 'green', label: 'Green', color: '#36B37E' },
    { value: 'forest', label: 'Forest', color: '#00875A' },
    { value: 'slate', label: 'Slate', color: '#253858' },
    { value: 'silver', label: 'Silver', color: '#666666' },
  ];

  useEffect(() => {
    dispatch(searchedText({ params: '', navigate }));
    dispatch(
      searchByRadius({
        params: {
          text: '',
          coordinates: user?.location?.coordinates,
        },
        navigate,
      })
    );
  }, []);

  socket.on('msg-recieve', (data) => {
    // showToast("Somebody Recently Send You Msg:", data);
    console.log('|||||--------data--------->>>>>>>>>', data);
  });

  const customCreateLabel = (inputValue) => {
    return ``;
  };

  const handleSearchChange = (inputValue) => {
    setSearchValue(inputValue?.value ? inputValue?.value : '');
    value == 0
      ? dispatch(
          searchedText({
            params: inputValue?.value ? inputValue?.value : '',
            navigate,
          })
        )
      : dispatch(
          searchByRadius({
            params: {
              text: inputValue?.value ? inputValue?.value : '',
              coordinates: user?.location?.coordinates,
            },
            navigate,
          })
        );
  };

  return (
    <section>
      <FlexBetween>
        <div className='!w-[80%]  '>
          {/* <SearchIconWrapper>
            <FaMicrophoneAlt />
          </SearchIconWrapper> */}
          {/* <StyledInputBase
            placeholder="Search…"
            onChange={(e) => {
              setSearchValue(e.target.value);
              value == 0
                ? dispatch(searchedText({ params: e.target.value, navigate }))
                : dispatch(
                    searchByRadius({
                      params: {
                        text: e.target.value,
                        coordinates: user?.location?.coordinates,
                      },
                      navigate,
                    })
                  );
            }}
            autoComplete="false"
            inputProps={{ "aria-label": "search" }}
          /> */}
          <CreatableSelect
            isClearable
            options={services}
            formatCreateLabel={customCreateLabel}
            onChange={handleSearchChange}
          />
        </div>
        <div className='flex items-center space-x-6'>
          <IconButton className='!rounded-full  !bg-[#c9c9c9] '>
            <FaMap className='!text-black' />
          </IconButton>
          <Link to={'/chat'}>
            <IconButton className='!rounded-full  !bg-[#c9c9c9] '>
              <ChatOutlined className='!text-black' />
            </IconButton>
          </Link>
          <Link to={'/notifications'}>
            <IconButton className='!rounded-full  !bg-[#c9c9c9] '>
              <NotificationsOutlined className='!text-black' />
            </IconButton>
          </Link>
        </div>
      </FlexBetween>
      <div className='py-6 grid grid-cols-5 grid-rows-6 gap-y-8 w-[85%] gap-x-4 mx-auto '>
        <div className='row-span-6 space-y-12 hidden sm:block sm:col-span-1'>
          <div
            onClick={() => {
              navigate('/profile');
            }}
            className='w-full cursor-pointer pt-2 pb-8 border-2 border-[#b3a9a9] space-y-8  bg-white  rounded-3xl '
          >
            <div className='relative'>
              <img src='' className='absolute -z-10' alt='' />
              <div
                style={{
                  top: '50%',
                  left: '50%',
                  transform: 'translateX(-50%) translateY(50%)',
                  // transform: "translateX(-50%) ",
                }}
                className=' absolute  flex flex-col items-center '
              >
                <Avatar
                  sx={{
                    height: 54,
                    width: 54,
                  }}
                  src={user?.profileImage}
                />
              </div>
            </div>
            <div className='space-y-3 pt-16 px-1'>
              <h4 className='!text-xl text-center !font-medium'>
                {user?.name}
              </h4>
              <Divider
                variant='inset'
                sx={{
                  borderBottom: 1,
                  borderColor: '#000',
                }}
              />
              <div className='flex items-center justify-center flex-col '>
                <h6 className='!text-lg  '>Total Likes</h6>
                <div className='flex space-x-2 items-center'>
                  <FaHeart />
                  <h4 className='!text-xl !font-bold'>{user?.likes / 1000}</h4>
                </div>
              </div>
            </div>
            <div className='w-full'>
              <div className='py-4 px-2 bg-[#C9EEFF] w-full text-center flex-col items-center justify-center space-y-4 '>
                <h4 className='text-2xl'>Total Views</h4>
                <h6 className='text-4xl font-bold'>360</h6>
              </div>
              <div className='py-4 px-2 bg-[#FFF2CC] w-full text-center flex-col items-center justify-center space-y-4 '>
                <h4 className='text-2xl'>Total Views</h4>
                <h6 className='text-4xl font-bold'>360</h6>
              </div>
              <div className='py-4 px-2 bg-[#FFAACF] w-full  text-center flex-col items-center justify-center space-y-4'>
                <h4 className='text-2xl'>Total Views</h4>
                <h6 className='text-4xl font-bold'>360</h6>
              </div>
            </div>
          </div>
        </div>

        <div className='col-span-5 sm:col-span-4 space-y-0 flex flex-col row-span-6'>
          <div className='bg-white px-3 pb-12 pt-3 relative rounded-xl w-full'>
            <div className='flex items-center w-full space-x-3'>
              <div
                onClick={() => {
                  setValue(0);
                  dispatch(searchedText({ params: searchValue, navigate }));
                }}
                className={`border-b-4 cursor-pointer text-xl py-3 font-medium w-full  text-center justify-center ${
                  value == 1 || value == 2
                    ? 'border-gray-400 text-gray-400'
                    : 'border-black text-black'
                } `}
              >
                Group
              </div>
              <div
                onClick={() => {
                  setValue(1);
                  dispatch(
                    searchByRadius({
                      params: {
                        text: searchValue,
                        coordinates: user?.location?.coordinates,
                      },
                      navigate,
                    })
                  );
                }}
                className={`border-b-4 cursor-pointer text-xl py-3 font-medium w-full  text-center justify-center ${
                  value == 0 || value == 2
                    ? 'border-gray-400 text-gray-400'
                    : 'border-black text-black'
                } `}
              >
                Radius
              </div>
              <div
                onClick={() => {
                  setValue(2);
                }}
                className={`border-b-4 cursor-pointer text-xl py-3 font-medium w-full  text-center justify-center ${
                  value == 2 && value != 1 && value != 0
                    ? 'border-black text-black'
                    : 'border-gray-400 text-gray-400'
                } `}
              >
                Search History
              </div>
            </div>
          </div>
          {value == 0 && <FriendList socket={socket} value={value} />}
          {value == 1 && <PrimaryList socket={socket} value={value} />}
          {/* {value == 1 && <UserProfileCard />} */}
          {/* {value == 1 && <UserNotificationCard />} */}

          {value == 2 && <SearchHistory />}
        </div>
        {/* <div className="col-span-1 bg-white rounded-xl !py-4 !px-3 row-span-6">
          <Typography variant="h5" fontWeight={700}>
            Notifications{" "}
          </Typography>
          <Divider
            variant="inset"
            sx={{
              py: 1,
              borderBottomWidth: 1,
              borderColor: "#000000",
            }}
          />
        </div> */}
      </div>
    </section>
  );
};

export default Home;
