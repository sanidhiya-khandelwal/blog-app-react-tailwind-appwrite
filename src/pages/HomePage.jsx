import React, { useState, useEffect } from 'react'
import service from '../appwrite/config'
import { PostCard, Container } from '../components/index'

function HomePage() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        service.getAllPosts([]).then(posts => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    if (posts.length === 0) {
        return (
            <div className='flex items-center justify-center'>
                <h1>No posts created...</h1>
            </div>
        )
    }
    return (
        <Container>
            <div className='flex flex-wrap gap-5 sm:gap-10'>
                {
                    posts.map(post => (
                        <div key={post.$id}>
                            <PostCard {...post} />
                        </div>
                    ))
                }
            </div>
        </Container>
    )
}

export default HomePage