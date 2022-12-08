import React from 'react'
import { useState, useEffect } from 'react'
import App from '../App.css'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from "react-toastify";

import { useCookies } from "react-cookie";


const Login = () => {

    const [passShow,setPassShow] =useState(false);

    const [cookies] = useCookies([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (cookies.jwt) {
      navigate("/");
    }
  }, [cookies, navigate]);

  const [values, setValues] = useState({ email: "", password: "" });
  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8080/login",
        {
          ...values,
        },
        { withCredentials: true }
      );
      if (data) {
        if (data.errors) {
          const { email, password } = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
        } else {
          navigate("/");
        }
      }
    } catch (ex) {
      console.log(ex);
    }
  };
  return (
    <>
    <div className="container">
    <div className="row">
      <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div className="card border-0 shadow rounded-3 my-5">
          <div className="card-body p-4 p-sm-5">
            <h5 className="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="form-floating mb-3">
                <input type="email" onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })} name="email" className="form-control" id="email" placeholder="name@example.com"/>
                <label htmlFor="email">Email address</label>
              </div>
              <div className="form-floating mb-3">
                <input type={!passShow ? 'password' : 'text'}  onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })} className="form-control" name="password" id="password" placeholder="Password"/>
                <div className='showpass' onClick={()=>setPassShow(!passShow)}>
                {!passShow ? 'Show' : 'Hide'}
              </div>

                <label htmlFor="password">Password</label>
              </div>
              
              
              <div className="d-grid">
                <button  className="btn  btn-login text-uppercase fw-bold" type="submit" style={{backgroundColor:"#FF4C72", color: "white" }}>Sign
                  in</button>
              </div>
              
              <div className='d-flex justify-content-center mt-4'>
              <p>Don't have an account ? <Link to="/Register"><button type="button" className="btn" style={{ backgroundColor: "#1DB5EE", color: "white" }}>Regsiter</button></Link></p>
              </div>
            </form>
            

          </div>
          
        </div>
      </div>
    </div>
  </div>
    </>
  )
}

export default Login
