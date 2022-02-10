import React from 'react';
import { FaUser } from 'react-icons/fa';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { register, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Register = () => {

    const [formData, setformData] = useState({
        name: '',
        email: '',
        password: '',
        confirmpass: ''
    });

    const { name, email, password, confirmpass } = formData

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

        if (password !== confirmpass)
            toast.error('password and confirm-password did not match!!!')
        else {
            const userData = {
                name,
                email,
                password
            }
            dispatch(register(userData))
        }
    }

    const onChangeHandler = (e) => {
        setformData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }

    return <>
        {(isLoading) ? (<Spinner />) : (<div>
            <h1><FaUser /> Register User</h1>
            <p>please register to log in to your account</p>
            <br></br>
            <form className='form' onSubmit={onSubmitHandler}>
                <div className='form-group'><input type='text' onChange={onChangeHandler} placeholder='name' id='name' name='name' value={name} required /></div>
                <div className='form-group'><input type='email' onChange={onChangeHandler} placeholder='email' id='email' name='email' value={email} required /></div>
                <div className='form-group'><input type='password' onChange={onChangeHandler} placeholder='password' id='password' name='password' value={password} required /></div>
                <div className='form-group'><input type='password' onChange={onChangeHandler} placeholder='confirm password' id='confirmpass' name='confirmpass' value={confirmpass} required /></div >
                <div className='form-group'><button className='btn btn-block'>Submit</button></div >
            </form >
        </div >)}

    </>;
};

export default Register;
