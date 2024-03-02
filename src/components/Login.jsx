import React from 'react'
import { Input, Button } from "./index"
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import authService from '../appwrite/auth'
import service from '../appwrite/config'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { login as Authlogin } from '../store/authSlice'
import { getPostsReducer } from '../store/postsSlice'

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");

    const loginFunc = async (data) => {
        setError("")
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(Authlogin(userData))

                    const posts = await service.getAllPosts([])
                    if (posts) {
                        dispatch(getPostsReducer(posts))

                    }
                    else {
                        console.log("Appwrite service :: getAllPost :: error ")
                    }
                }
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <div className='flex items-center justify-center w-full mt-5 sm:mt-7 Md:mt-10 '>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl py-3 sm:p-10`}>
                <h2 className="text-center text-xl sm:text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 underline underline-offset-2"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <div className='flex justify-center mt-5'>
                    <form onSubmit={handleSubmit(loginFunc)}>
                        <Input
                            label="Email:"
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
                        {/* This regular expression ensures that the password contains at least one alphabet character and at least one digit. */}
                        <Input
                            label="Password:"
                            type="password"
                            placeholder="Enter password..."
                            className="w-[20rem]"
                            {...register("password", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/.test(value) || "Password must be valid"
                                }
                            })}
                        />
                        <div className='flex justify-center'>
                            <Button type='submit' className='mt-5 '>Log in</Button>
                        </div>

                    </form>
                </div>

            </div>
        </div>
    )
}

export default Login