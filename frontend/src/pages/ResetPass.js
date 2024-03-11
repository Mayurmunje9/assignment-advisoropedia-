import React, { useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { useParams,useNavigate } from 'react-router-dom';
import { message } from 'antd';
import "../css/ResetPass.css"; // Import your CSS file for styling
import { useSelector, useDispatch } from "react-redux";
import { hideLoading,showLoading } from "../Redux/alertSlice";

const ResetPass = () => { 
    const loading = useSelector((state) => state.alerts);
    const history=useNavigate()
    const { token } = useParams();
    const dispatch=useDispatch();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const handleResetPassword = async () => {
       
        if (newPassword !== confirmPassword) {
            message.error("Passwords do not match");
            return;
        }

        try {
            dispatch(showLoading())
            const response = await axios.post(`/api/auth/user/reset-password/${token}`, { newPassword });
            dispatch(hideLoading())
            console.log(response.data);
            message.success("Password reset successfully");
            history('/login')
            // Redirect the user to login page or any other page
        } catch (error) {
            dispatch(hideLoading())
            console.error('Error resetting password:', error);
            message.error("Could not reset password");
        }
    };
    

    return (
        <>
           {loading ? (
            <Spinner />
          ) : (
        <div className="reset">
        <div className="resetpass-container">
            <h2>Reset Password</h2>
            <div className="resetpass-input">
                <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </div>
            <div className="resetpass-input">
                <input type="password" placeholder="Confirm New Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <button className="resetpass-button" onClick={handleResetPassword}>Reset Password</button>
        </div>
        </div>
          )}
        </>
    );
};

export default ResetPass;
