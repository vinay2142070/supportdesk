import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { createTicket, reset } from '../features/ticket/ticketSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';



const NewTicket = () => {

    const { user } = useSelector((state) => state.auth)
    const { ticket, isLoading, isSuccess, message, isError } = useSelector((state) => state.ticket)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [product, setproduct] = useState('iPhone');
    const [description, setdescription] = useState();


    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess) {
            dispatch(reset())
            navigate('/')
        }
    }, [dispatch, isError, isSuccess, navigate, message]);

    const onChangeHandler = (e) => {
        if (e.target.id === 'product')
            setproduct(e.target.value)

        if (e.target.id === 'description')
            setdescription(e.target.value)
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        const ticket = {
            product,
            description
        }
        await dispatch(createTicket(ticket, user.token))

        //   navigate('/tickets')
    }
    if (isLoading) {
        return <Spinner />
    }
    return <>
        <BackButton url='/' />
        <section className='heading'>
            <h1>What do you need help with?</h1>
            <p>please choose from an option below</p>
        </section>
        <form className='form' onSubmit={onSubmitHandler}>
            <div className='form-group'>
                <label>Customer Name</label>
                <input onChange={onChangeHandler} id='name' value={user.name} disabled></input>
            </div>

            <div className='form-group'>
                <label>Customer Email</label>
                <input onChange={onChangeHandler} id='email' value={user.email} disabled></input>
            </div>

            <div className='form-group'>
                <label>Product</label>
                <select defaultValue='Macbook Pro' required onChange={(e) => setproduct(e.target.value)} id='product' value={product} >
                    <option>Iphone</option>
                    <option>Macbook Pro</option>
                    <option>iMac</option>
                    <option>iPad</option>
                </select>
            </div>

            <div className='form-group'>
                <label>Description</label>
                <textarea required onChange={onChangeHandler} id='description' value={description}></textarea>
            </div>

            <button className='btn btn-block'>Submit</button>

        </form>
    </>;
};

export default NewTicket;
