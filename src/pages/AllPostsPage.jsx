import React, { useEffect, useState } from 'react'
import service from '../appwrite/config';
import { Container, PostCard } from '../components/index'

function AllPostsPage() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        service.getAllPosts([]).then(posts => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    //waiting for the page to fetch data
    if (posts.length === 0) {
        return (
            <div className='flex items-center justify-center'>
                <img className='m-auto mt-5 h-full' src="/spinner.gif" alt="spinner" />
            </div>
        )
    }

    return (
        <Container>
            <div className='flex flex-wrap justify-around sm:justify-between gap-5 sm:gap-10'>
                {
                    posts ? (posts.map(post => (
                        <div key={post.$id}>
                            <PostCard {...post} />
                        </div>)
                    )) : (
                        <div className='w-full h-[70vh] flex justify-center items-center'>
                            <h1 className='font-semibold text-xl sm:text-2xl'>No posts created😑</h1>
                        </div>
                    )
                }
            </div>
        </Container>
    )
}

export default AllPostsPage