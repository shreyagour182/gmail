import React from 'react';
import './EmailRow.css';
import { Checkbox, IconButton } from '@mui/material';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import LabelImportantOutlinedIcon from '@mui/icons-material/LabelImportantOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { selectMail } from './features/mailSlice';
import { db } from './firebase';
import { doc, deleteDoc } from 'firebase/firestore';

function EmailRow({ id, title, subject, description, time }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const openMail = () => {
    dispatch(selectMail({ id, title, subject, description, time }));
    navigate('/mail');
  };

  const handleDelete = async (e) => {
    e.stopPropagation(); // Prevent row click navigation
    const confirmDelete = window.confirm("Delete this email?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, 'emails', id));
      alert("Email deleted successfully");
    } catch (error) {
      console.error("Delete failed:", error.message);
      alert("Could not delete the email.");
    }
  };

  return (
    <div onClick={openMail} className='emailRow'>
      <div className='emailRow__options'>
        <Checkbox />
        <IconButton>
          <StarBorderOutlinedIcon />
        </IconButton>
        <IconButton>
          <LabelImportantOutlinedIcon />
        </IconButton>
        <IconButton onClick={handleDelete}>
          <DeleteIcon style={{ color: 'red' }} />
        </IconButton>
      </div>

      <h3 className='emailRow__title'>{title}</h3>

      <div className='emailRow__message'>
        <h4>
          {subject}{' '}
          <span className='emailRow__description'>- {description}</span>
        </h4>
      </div>

      <p className='emailRow__time'>{time}</p>
    </div>
  );
}

EmailRow.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};

export default EmailRow;