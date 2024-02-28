import React from 'react'
import authService from '../../appwrite/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/authSlice'

function LogoutButton() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout());
            navigate('/');
        })
    }
    return (
        <button className='text-[0.8rem] rounded-md px-3 bg-black sm:rounded-lg sm:px-2 sm:py-1 text-white'
            onClick={logoutHandler}
        >
            Logout
        </button>
    )
}

export default LogoutButton