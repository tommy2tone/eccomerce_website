import React, {useState} from 'react'
import Base from '../core/Base'
import {signin, authenticate, isAuthenticated} from "../auth/helper"
import { Link, Navigate } from 'react-router-dom'





const Signin = () => {
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        success: false,
        loading: false,
        didRedirect: false
    });

    const {email, password, error, success, loading, didRedirect} = values;

    const handleChange = (name) => 
        (event) => {
        setValues({...values, error: false, [name]: event.target.value})
    };

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error: false, loading:true});
        signin({email, password})
        .then(data => {
            console.log("Data", data);
            if (data.token) {
                let sessionToken = data.token;
                authenticate(sessionToken, () => {
                    setValues({
                        ...values,
                        didRedirect: true,
                        
                    });
                });
                          
            }else{
                setValues({
                    ...values,
                    loading: false
                });
            }
        })
        .catch((err) => console.log(err));
    };

    const performRedirect = () => {
        if (isAuthenticated()) {
            return (
                <Navigate to='/'/>
            )
            
        }
    };

    const loadingMessage = () => {
        return (
            loading && (
                <div className="alert alert-info">
                    <h2>Loading...</h2>
                </div>
            )
        )
    };

    const successMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div 
                    className='Aler alert-success'
                    style={{display:success ? "" : 'none'}}
                    >
                        New account created successfully.  Please 
                            <Link to="/signin">login </Link> now. 
                    </div>
                </div>
            </div>
        );
    };

    const errorMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div 
                    className='Aler alert-danger'
                    style={{display: error ? "" : 'none'}}
                    >
                        Check all fields again.
                    </div>
                </div>
            </div>
        );
    };

    const signInForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input 
                            className='form-control'
                            value={email}
                            onChange={handleChange("email")}
                            type="text"/>
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input 
                            className='form-control'
                            value={password}
                            onChange={handleChange("password")}
                            type="password"/>
                        </div>
                        <br/>
                        <button
                        onClick={onSubmit} 
                        className="btn btn-success btn-block">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        );
    };

  return (
    <Base title='Sign In' description='Please Signin'>
        {loadingMessage()}
        {signInForm()}
        <p className='text-center'>{JSON.stringify(values)}</p>
        {performRedirect()}
    </Base>
  )
}

export default Signin