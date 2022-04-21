import React, {useState} from 'react'
import Base from "../core/Base"
import {signup} from "../auth/helper"
import { Link } from 'react-router-dom'
import { eventWrapper } from '@testing-library/user-event/dist/utils';

const Signup = () => {

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    });

    const {name, email, password, error, success} = values;

    const handleChange = (name) => 
        (event) => {
        setValues({...values, error: false, [name]: event.target.value})
    };

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error: false});
        signup({name, email, password})
        .then(data => {
            console.log("Data", data);
            if (data.email === email) {
                setValues({
                    ...values,
                    name: "",
                    email: "",
                    password: "",
                    error: "",
                    success: true
                })
                
            }else{
                setValues({
                    ...values,
                    error: true,
                    success: false
                })
            }
        })
        .catch((err) => console.log(err));
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

    const signUpForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Name</label>
                            <input 
                            className='form-control'
                            value={name}
                            onChange={handleChange("name")}
                            type="text"/>
                        </div>
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
    <Base title='Sign Up Page' description='a signup page for users'>
    {errorMessage()}
    {successMessage()}
    {signUpForm()}

    <p className='text-whtie text-center'>
        {JSON.stringify(values)}
    </p>

    </Base>
  );
};

export default Signup