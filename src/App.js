/**
 * The App function defines the routes and components for a React application, including user
 * authentication and various pages.
 * @returns The App component is being returned, which contains the Routes and Route components for
 * different pages, as well as the ToastContainer component for displaying notifications. The
 * useSelector hook is also used to retrieve the user data from the Redux store.
 */

import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Notifications from './pages/Notifications';
import Chat from './pages/Chat';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProfileApp from './pages/ProfileApp';
import SearchHistory from './pages/SearchHistory';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import { io } from 'socket.io-client';

const App = () => {
  const user = useSelector(selectUser);

  var socket = io(process.env.REACT_APP_API_URL?.slice(0, -7), {
    extraHeaders: {
      token: user?.token,
    },
  });

  useEffect(() => {
    socket.connect();
  }, [user]);

  return (
    <main>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path={'/register'} element={<Register />} />
          <Route path={'/'} element={<Login />} />
          <Route path={'/profile'} element={<ProfileApp />} />
          <Route path={'/home'} element={<Home socket={socket} />} />
          <Route
            path={'/notifications'}
            element={<Notifications socket={socket} />}
          />
          <Route path={'/chat'} element={<Chat socket={socket} />} />
          <Route path={'/search-history'} element={<SearchHistory />} />
        </Route>
      </Routes>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
        limit={1}
      />
      <ToastContainer />
    </main>
  );
};

export default App;
