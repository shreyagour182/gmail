import React from 'react';
import "./SendMail.css";
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { closeSendMessage } from './features/mailSlice';
import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function SendMail() {
    // useForm se 'reset' bhi destructure karein
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
   const dispatch = useDispatch();
    // Form submit hone ke baad automatically reset ho jayega
    const onSubmit = async(data) => {
        console.log("Form Data:", data);
        reset(); // Yeh pura form clear karega
       try {
    await addDoc(collection(db, "emails"), {
      to: data.To,
      subject: data.Subject,
      message: data.message,
      timestamp: serverTimestamp()
    });
    dispatch(closeSendMessage());
    alert("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    alert("Something went wrong!");
  }
    };

    return (
        <div className='sendMail'>
            <div className='sendMail_header'>
                <h3>New Message</h3>
                <CloseIcon onClick={()=> dispatch(closeSendMessage())}
                 className='sendMail__close' />
            </div>

            <form onSubmit={handleSubmit(onSubmit)}> 
                {/* To Field */}
                <input name='To' type='email' placeholder="To" {...register('To', { required: "Recipient is required" })} />
                {errors.To && <span style={{color: 'red'}}>{errors.To.message}</span>}

                {/* Subject Field */}
                <input name='Subject' type='text' placeholder="Subject" {...register('Subject', { required: "Subject is required" })} />
                {errors.Subject && <span style={{color: 'red'}}>{errors.Subject.message}</span>}

                {/* Message Field */}
                <input name='message' className='sendMail_message' type='text' placeholder="Message..." {...register('message', { required: "Message cannot be empty" })} />
                {errors.message && <span style={{color: 'red'}}>{errors.message.message}</span>}

                {/* Send Button */}
                <div className='sendMail__options'>
                    <Button className='sendMail__send' variant='contained' color='primary' type='submit'>
                        Send
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default SendMail;