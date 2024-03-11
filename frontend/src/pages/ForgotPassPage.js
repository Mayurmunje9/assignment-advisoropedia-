import React, { useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { message } from 'antd';
import "../css/Forgotpass.css";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading,showLoading } from "../Redux/alertSlice"
const ForgotPassPage = () => {
    const [email, setEmail] = useState('');
    const loading = useSelector((state) => state.alerts);
  const dispatch=useDispatch();
    
    const validateEmail = (email) => {
        // Regular expression to check if email is valid
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleResetRequest = async () => {
        if (!validateEmail(email)) {
            // Display an error message if email is invalid
            message.error('Please enter a valid email address');
            return;
        }

        try {
            // Proceed with password reset request
            dispatch(showLoading())
            const response = await axios.post('https://assignment-advisoropedia-1.onrender.com/api/auth/user/reset-password', { email });
            console.log(response.data);
            dispatch(hideLoading())
            message.success('Check your email'); // Corrected typo here
        } catch (error) {
            console.log(error)
            console.error('Error requesting password reset:', error);
            message.error("Could not proceed with password reset");
        }
    };

    return (
        
        <div className="back">
               {loading ? (
            <Spinner />
          ) : (
            <div className="forgotpass-container">
                <div className="forgotpass-form">
                    <h2 className="forgotpass-title">Forgot Password</h2>
                    <div className="forgotpass-input">
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
                    </div>
                    <div>
                        <button className="forgotpass-button" onClick={handleResetRequest}>Reset Password</button>
                    </div>
                </div>
            </div>
          )}
        </div>
    );
};

export default ForgotPassPage;
