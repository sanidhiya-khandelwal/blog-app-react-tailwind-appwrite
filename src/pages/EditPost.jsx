import React, { useState, useEffect } from 'react'
import service from '../appwrite/config'
import { PostForm, Container } from '../components/index'
import { useNavigate, useParams } from 'react-router-dom'

function EditPost() {
    const [post, setPost] = useState();
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            service.getPost(slug).then(post => {
                if (post) {
                    setPost(post)
                }
            })
        } else {
            navigate("/")
        }
    }, [slug, navigate])

    //waits for the data to be displayed
    if (!post) {
        return <div className='flex items-center justify-center'>
            <img className='m-auto mt-5 h-full' src="/spinner.gif" alt="spinner" />
        </div>
    }

    return post ? (
        <div>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null
}

export default EditPost