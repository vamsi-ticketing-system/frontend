import React from 'react';
import { Button, TextField } from '@mui/material';

import { useFormik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import  { useDispatch } from 'react-redux';
import { authActions } from '../store/auth';

function Login() {
    const dispatch = useDispatch();

    let loginForm = useFormik({
        initialValues:{
            email_id:"",
            password:""
        },
        validationSchema: Yup.object(
            {
                email_id: Yup.string().required("Email ID is required"),
                password: Yup.string().required("Password is required")
            }
        ),
        onSubmit:(values)=>{
            loginCheck(values);
        }
    });
  
    const loginCheck = (values) =>{
        axios.post('http://localhost:3001/signin',values).then((response)=>{
        let data = response['data'];
            dispatch(authActions.login(data));
        });
    }

    return (
        <div className='w-full flex flex-col justify-center items-center'>
                <form onSubmit={loginForm.handleSubmit} className='flex flex-col gap-2 w-1/4'>
                    <div className='text-center font-bold'>Login Page</div>
                    <div className='flex flex-col'>
                        <label>Email Id</label>
                        <TextField
                            hiddenLabel
                            id="filled-hidden-label-small"
                            placeholder='Email ID'
                            name="email_id"
                            variant="filled"
                            size="small"
                            onChange={loginForm.handleChange}
                            onBlur={loginForm.handleBlur}
                            error={loginForm.touched.email_id && loginForm.errors.email_id ? true : false }
                            />
                        {loginForm.touched.email_id && loginForm.errors.email_id ? (
                            <span className="text-red-700">{loginForm.errors.email_id}</span>
                        ) : null} 
                    </div>
                    <div className='flex flex-col'>
                        <label>Password</label>
                        <TextField
                            type='password'
                            name="password"
                            hiddenLabel
                            id="filled-hidden-label-small"
                            placeholder='Password'
                            variant="filled"
                            size="small"
                            onChange={loginForm.handleChange}
                            onBlur={loginForm.handleBlur}
                            error={loginForm.touched.password && loginForm.errors.password ? true : false }
                            />
                        {loginForm.touched.password && loginForm.errors.password ? (
                            <span className="text-red-700">{loginForm.errors.password}</span>
                        ) : null}
                    </div>
                    <div className='flex justify-end'>
                        <Button type='submit' variant="contained">Login</Button>
                    </div>
                </form>
            </div>
    )
}

export default Login
