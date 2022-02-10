import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { getTickets, reset } from '../features/ticket/ticketSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import TicketItem from '../components/TicketItem';

const Tickets = () => {

    const { user } = useSelector((state) => state.auth)
    const { tickets, isLoading, isSuccess, message, isError } = useSelector((state) => state.ticket)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    useEffect(() => {
        dispatch(getTickets())
    }, []);

    useEffect(() => {
        if (isError) {
            toast.error(message)
            dispatch(reset())
            navigate('/')

        }
        if (isSuccess) {
            //     dispatch(reset())
            // navigate('/')
        }
    }, [dispatch, isError, isSuccess, navigate, message]);


    return (
        <>
            <BackButton url='/' />
            <h1>Tickets</h1>
            <div className='tickets'>
                <div className='ticket-headings'>
                    <div>Date</div>
                    <div>Product</div>
                    <div>Status</div>
                    <div></div>
                </div>
                {tickets.map((ticket) => (
                    <TicketItem key={ticket._id} ticket={ticket} />
                ))}
            </div>
        </>
    )
};

export default Tickets;
