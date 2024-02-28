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

export default AllPostsPage