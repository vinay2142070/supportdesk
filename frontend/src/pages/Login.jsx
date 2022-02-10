import React from 'react';
import { FaSignInAlt, FaUser } from 'react-icons/fa';
import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

const Login = () => {

    const [formData, setformData] = useState({
        email: '',
        password: '',

    });

    const { email, password } = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user, isLoading, isSuccess, message, isError } = useSelector((state) => state.auth)

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        // Redirect when logged in

        if (isSuccess || user) {
            navigate('/')

        }

        dispatch(reset())
    }, [isError, isSuccess, user, message, navigate, dispatch])


    const onSubmitHandler = (e) => {
        e.preventDefault();

        const userData = {
            email,
            password
        }
        dispatch(login(userData))

    }

    const onChangeHandler = (e) => {
        setformData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }

    return <>
        {(isLoading) ? (<Spinner />) : (<div>
            <h1><FaSignInAlt /> Login User</h1>
            <p>please log in to your account to raise a ticket</p>
            <br></br>
            <form className='form' onSubmit={onSubmitHandler}>

                <div className='form-group'><input type='email' onChange={onChangeHandler} placeholder='email' id='email' name='email' value={email} required /></div>
                <div className='form-group'><input type='password' onChange={onChangeHandler} placeholder='password' id='password' name='password' value={password} required /></div>
                <div className='form-group'><button className='btn btn-block'>Login</button></div >
            </form >
        </div >)
        }
    </>;
};

export default Login;
