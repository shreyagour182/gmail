// App.js
import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Mail from './Mail';
import EmailList from './EmailList';
import SendMail from './SendMail';
import Login from './Login';
import { useSelector, useDispatch } from 'react-redux';
import { selectSendMessageIsOpen } from './features/mailSlice';
import { selectUser, login, logout } from './features/userSlice';
import { auth } from './firebase';

function App() {
  const [loading, setLoading] = useState(true);
  const user = useSelector(selectUser);
  const SendMessageIsOpen = useSelector(selectSendMessageIsOpen);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(login({
          displayName: userAuth.displayName,
          email: userAuth.email,
          photoURL: userAuth.photoURL,
        }));
      } else {
        dispatch(logout());
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <Router>
      {!user ? (
        <Login />
      ) : (
        <div className="App">
          <Header />
          <div className="app__body">
            <Sidebar />
            <Routes>
              <Route path="/mail" element={<Mail />} />
              <Route path="/" element={<EmailList />} />
            </Routes>
          </div>
          {SendMessageIsOpen && <SendMail />}
        </div>
      )}
    </Router>
  );
}

export default App;