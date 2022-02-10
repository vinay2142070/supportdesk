import React from 'react';
import { Link } from 'react-router-dom';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



function Header() {


    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)


    const logoutHandler = async () => {
        await dispatch(logout())
        dispatch(reset())
        navigate('/login')
    }




    return (<header className='header'>
        <div className='logo'>
            <Link to='/'>Support-Desk</Link>
        </div>

        <ul>

            {(user) ? (<li>
                <button className='btn' onClick={logoutHandler} ><FaSignOutAlt />Logout</button>

            </li>) : (<> <li>
                <Link to='/login'><FaSignInAlt />Login</Link>

            </li>
                <li>
                    <Link to='/register'><FaUser />Register</Link>

                </li></>)}
        </ul>


    </header >);
}

export default Header;
