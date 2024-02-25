import React from 'react'
import authService from '../../appwrite/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/authSlice'

function LogoutButton() {
    const dispatch = useDispatch();

    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout());
            navigate('/');
        })
    }
    return (
        <button className='bg-black rounded-lg px-2 py-1 text-white'
            onClick={logoutHandler}
        >
            LogoutButton
        </button>
    )
}

export default LogoutButton