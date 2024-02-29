import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { login as AuthLogin } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Input, Button } from './index'


function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const { register, handleSubmit } = useForm();

    const signUpFunc = async (data) => {
        setError("")
        try {
            const session = await authService.createAccount(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(AuthLogin(userData))
                    navigate("/")
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <div className='py-5 sm:w-[50%] m-auto mt-10  bg-gray-100 rounded-xl'>
            <div className='flex flex-col items-center'>
                <h1 className='font-semibold text-2xl'>Sign up to create account</h1>
                <h5 className='mt-1'>Already have an account? <Link to="/login" className='underline underline-offset-2'>Sign In</Link> </h5>
            </div>
            <div className='text-center mt-5'>
                {error && <p className='text-red-600 text-[1.1rem]'>{error}</p>}
            </div>
            <form onSubmit={handleSubmit(signUpFunc)} className='flex flex-col items-center'>
                <Input
                    label="Full Name: "
                    type="text"
                    placeholder="Enter full name"
                    className="w-[20rem] mb-2"
                    {...register("fullname", { required: true, minLength: 2 })}
                />
                <Input
                    label="Email: "
                    type="email"
                    placeholder="Enter email..."
                    className="w-[20rem] mb-2"
                    {...register("email", {
                        required: true,
                        validate: {
                            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                        }
                    })}
                />
                <Input
                    label="Password: "
                    type="password"
                    placeholder="Enter password..."
                    className="w-[20rem] mb-2"
                    {...register("password", {
                        required: true,
                        validate: {
                            matchPatern: (value) => /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/.test(value) || "Password must be valid"
                        }
                    })}
                />
                <Button
                    type='submit'
                >Sign Up</Button>
            </form>
        </div>
    )
}

export default Signup