import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Container, LogoutButton } from '../index'


function Header() {

    const authStatus = useSelector((state) => state.auth.status) //check for "auth", name same as what we gave in authSlice // name: "auth", check by giving different name
    // const authStatus = true;
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
        <Container>
            <header className='flex justify-between py-2 h-[3rem]'>
                <div className='cursor-pointer'>
                    <Link to="/">
                        <img className='w-[2rem] h-[2rem] rounded-md' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAHXPluq6GtTRPDIHRv5kJPy86uFjp5sO7hg&usqp=CAU" alt="logo" />
                    </Link>
                </div>
                <div className='flex gap-3'>
                    {
                        navItems.map((item) => (
                            item.active ? (
                                <button key={item.name}
                                    onClick={() => navigate(item.slug)}
                                    className="bg-black rounded-lg px-2 py-1 text-white"
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
        </Container>
    )
}

export default Header