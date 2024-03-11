import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from 'antd';
import Spinner from "../components/Spinner";
import { useDispatch ,useSelector} from "react-redux";
import { hideLoading, showLoading } from "../Redux/alertSlice";
import "../css/register.css";

export default function Register() {
  const {loading}  = useSelector((state) => state.alerts);
  const dispatch=useDispatch();
 
  const history=useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
      confirmPassword: "",
      profilePicture: null // Store the selected profile picture file
    });
    
    const onChangeHandler = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };
    
    const onSubmit = async (e) => {
      e.preventDefault();
      console.log(loading)
      
      try {
          const { name, email, password, confirmPassword, profilePicture } = formData;

          if(password.length<6){
            message.error("Password should be greater than 5 Characters")
          }
          
          // Check if passwords match
          if (password !== confirmPassword) {
              message.error("Passwords do not match");
              return;
          }
          const userData = {
            name,
            email,
            password,
            confirmPassword,
            profilePicture
          };
          
          // Make API call to register user
          dispatch(showLoading())
          console.log(loading)
          const response = await axios.post("/api/auth/user/register", userData);

          if (response.data.success) {
            dispatch(hideLoading())
            message.success("Please verify your account! check your email");
            history('/login')
              // Redirect user to login page or any other page
          } else {
            dispatch(hideLoading())
              message.error(response.data.message);
          }
          dispatch(hideLoading())
      } catch (error) {
        dispatch(hideLoading())
          console.error("Error registering user:", error);
          message.error("Somethong went wrong Check your fields");

      }
  };

  return (
    <div>
       {loading ? (
            <Spinner />
          ) : (
      <div className="back">
        <div className="background">
          <div className="shape"></div>
          <div className="shape"></div>
        </div>
        <form onSubmit={onSubmit}>
          <h3>Register Now !</h3>
         
            <>
              <label htmlFor="name">Name</label>
              <input type="text" name="name" placeholder="Name" id="name" onChange={onChangeHandler} value={formData.name} />
              <label htmlFor="email">Email</label>
              <input type="email" name="email" placeholder="Email" id="email" onChange={onChangeHandler} value={formData.email} />
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="Password" id="password" onChange={onChangeHandler} value={formData.password} />
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" name="confirmPassword" placeholder="Confirm Password" id="confirmPassword" onChange={onChangeHandler} value={formData.confirmPassword} />
              {/* Optional field for profile picture */}
              <label htmlFor="profilePicture">Profile Picture</label>
              <input type="file" accept="image/*" name="profilePicture" id="profilePicture" onChange={onChangeHandler} />
              <button type="submit">Register</button>
              <div className="registering">
                Already have an account? <Link to="/login">Login</Link>
              </div>
              <div className="social">
                <div className="go">
                  <i className="fab fa-google"></i> Google
                </div>
                <div className="fb">
                  <i className="fab fa-facebook"></i> Facebook
                </div>
              </div>
            </>
          
        </form>
        {message.error && <p className="error-message">{message.error}</p>} {/* Display error message if passwords don't match */}
      </div>
          )}
    </div>
  );
  
}
