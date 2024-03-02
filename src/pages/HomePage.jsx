import React, { useState, useEffect } from 'react'
import service from '../appwrite/config'
import { PostCard, Container } from '../components/index'
import { useSelector } from 'react-redux';

function HomePage() {
    const [posts, setPosts] = useState([]);
    const allPosts = useSelector(state => state.posts.postsData)

    useEffect(() => {
        if (allPosts) {
            setPosts(allPosts.documents)
        }
    }, [allPosts])

    //runs when user is not logged in
    if (posts.length === 0) {
        return (
            <div className="flex flex-wrap w-full h-[60vh] items-center justify-center">
                <h1 className="text-2xl font-bold hover:text-gray-500">
                    Login to read posts
                </h1>
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

export default HomePage