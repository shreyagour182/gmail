import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import './Header.css';
import Avatar from '@mui/material/Avatar';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AppsIcon from '@mui/icons-material/Apps';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useSelector, useDispatch } from 'react-redux';
import { logout, selectUser } from './features/userSlice';
import { auth } from './firebase';

function Header() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const signOut = () => {
    auth.signOut().then(() => {
      dispatch(logout()); // ✅ Corrected: dispatch() instead of dispatchEvent()
    });
  };

  return (
    <div className='header'>
      <div className='header__left'>
        <IconButton>
          <MenuIcon />
        </IconButton>
        <img
          src='https://t4.ftcdn.net/jpg/11/75/80/57/360_F_1175805796_Oer2fJ1Q0fHRDV7kEfAgMF5EJOA0tKEw.jpg'
          alt='Reddit Logo'
        />
      </div>

      <div className='header__middle'>
        <SearchIcon />
        <input placeholder='Search Mail' type='text' />
        <ArrowDropDownIcon className='header__inputCaret' />
      </div>

      <div className='header__right'>
        <IconButton>
          <AppsIcon />
        </IconButton>
        <IconButton>
          <NotificationsIcon />
        </IconButton>
        <IconButton onClick={signOut}>
          <Avatar src={user?.photoURL || ''} />
        </IconButton>
      </div>
    </div>
  );
}

export default Header;