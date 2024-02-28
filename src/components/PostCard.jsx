import React from 'react'
import { Link } from 'react-router-dom'
import service from '../appwrite/config'
function PostCard({ $id, title, featuredImage, blogCategory }) {
    return (
        <Link to={`/post/${$id}`}>
            <div className='mt-8 mb-2 rounded-md shadow-xl hover:scale-[1.01] duration-200 border-black w-[14rem] h-[16rem] sm:px-0 sm:w-[14rem] sm:h-[20rem]'>
                <img className='object-cover px-1 w-full h-[74%] rounded-md' src={service.getFilePreview(featuredImage)} alt={title} />
                <div className='flex justify-between px-3 mt-3'>
                    <h1 className='font-semibold'>{title}</h1>
                    <h6 className=''>{blogCategory}</h6>
                </div>
            </div>
        </Link>
    )
}

export default PostCard