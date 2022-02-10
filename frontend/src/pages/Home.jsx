import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return <>
        <section className='heading'>
            <h1>What do you need help with?</h1>
            <p>please choose from an option below</p>
        </section>
        <Link to='/create-ticket' className='btn btn-reverse btn-block'>Create a new ticket</Link>
        <Link to='/view-tickets' className='btn  btn-block'>View tickets</Link>
    </>
};

export default Home;
