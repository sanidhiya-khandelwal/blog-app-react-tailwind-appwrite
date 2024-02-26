import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function AuthLayout({ children, authentication = true }) {
    const [isLoader, setIsLoader] = useState(true)
    const navigate = useNavigate();
    const authStatus = useSelector(state => state.auth.status);

    useEffect((() => {
        if (authentication && authStatus !== authentication) {
            navigate("/login");
        } else if (!authentication && authStatus !== authentication) {
            navigate("/")
        }
        setIsLoader(false)
    }), [authStatus, navigate, authentication])
    return isLoader ? <h1>Loading.......</h1> : <>{children}</>
}

export default AuthLayout