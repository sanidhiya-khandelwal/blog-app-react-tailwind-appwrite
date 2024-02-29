import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Container, LogoutButton } from '../index'


function Header() {

    const authStatus = useSelector((state) => state.auth.status) //check for "auth", name same as what we gave in authSlice // name: "auth", check by giving different name

    const navigate = useNavigate();

    const navItems = [
        {
            name: 'Home',
            slug: "/",
            active: true
        },
        {
            name: 'Signup',
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: 'Login',
            slug: "/login",
            active: !authStatus,
        },
        {
            name: 'All Posts',
            slug: '/all-posts',
            active: authStatus,
        },
        {
            name: 'Add Post',
            slug: '/add-post',
            active: authStatus,
        }
    ]

    return (
        <header className='flex justify-between items-center py-5 px-5 mb-2 sm:h-[3rem] bg-slate-100 shadow-md'>
            <div className='cursor-pointer'>
                <Link to="/">
                    <h1 className=' px-3 bg-slate-500 text-white text-[1.2rem] sm:text-2xl rounded-md'>A</h1>
                </Link>
            </div>
            <div className='flex gap-2 flex-wrap'>
                {
                    navItems.map((item) => (
                        item.active ? (
                            <button key={item.name}
                                onClick={() => navigate(item.slug)}
                                className="text-[0.8rem] rounded-md px-3 py-1 bg-black sm:rounded-lg sm:px-3 sm:py-[0.3rem]  text-white"
                            >
                                {item.name}
                            </button>) : null
                    ))
                }
                {
                    authStatus ? <LogoutButton /> : null
                }
            </div>
        </header>
    )
}

export default Header