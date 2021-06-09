import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LoginOverlay from './components/loginOverlay';
import { findUser, viewUser } from './usersSlice';
// import Dropdown from "react-dropdown";
import Button from '../components/button';
import 'react-dropdown/style.css';

export const User = () => {
  const dispatch = useDispatch();
  const value = useSelector(viewUser);

  const [modalShow, setModalShow] = useState(false);
  const [isUser, setUserState] = useState(false);

  useEffect(() => {
    setUserState(!isUser);
  }, [value]);

  const userSearch = (userData) => {
    dispatch(findUser(userData));
  };

  // const loginOrUserData = isUser ? (
  //   <LoginOverlay
  //     userSearch={userSearch}
  //     exists={value}
  //     title="Sign In"
  //     show={modalShow}
  //     onHide={() => setModalShow(false)}
  //   />
  // ) : (
  //   <h1>Success</h1>
  // );

  return (
    <div>
      <LoginOverlay
        userSearch={userSearch}
        exists={value}
        title="Sign In"
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <Button
        text={value.length ? value : 'login'}
        onClick={() => setModalShow(true)}
      />
    </div>
  );
};
