import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import service from '../appwrite/config'
import { Container, Button } from '../components/index'
import parse from 'html-react-parser';

function PostPage() {
    const [post, setPost] = useState(null);
    const navigate = useNavigate();
    const { slug } = useParams();
    const userData = useSelector(state => state.auth.userData)

    const isAuthor = post && userData ? (post.userId === (userData.userData.$id)) : false;


    useEffect(() => {
        if (slug) {
            service.getPost(slug).then(post => {
                if (post) {
                    setPost(post);
                }
                else {
                    navigate("/")
                }
            })
        } else {
            navigate("/")
        }
    }, [slug, navigate]);

    const deletePost = () => {
        service.deletePost(post.$id).then(status => {
            if (status) {
                service.deleteFile(post.featuredImage);
                navigate("/")
            }
        }
        )
    }

    return post ? (
        <Container>
            <div>
                <div className='shadow-lg w-full h-[25rem] rounded-xl flex mt-10'>
                    <img
                        className='relative h-full rounded-xl'
                        src={service.getFilePreview(post.featuredImage)}
                        alt={post.title} />
                </div>
                {
                    isAuthor && (
                        <div className='absolute right-7 top-32 sm:right-16 sm:top-28'>
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className='mr-3 '>Edit</Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>Delete</Button>
                        </div>
                    )
                }
            </div>
            <div className='text-[1rem] p-2 mt-5'>
                <h2><b>Title :</b> {post.title}</h2>
                <h2><b>Category : </b>{post.blogCategory}</h2>
                <h2><b>Status : </b>{post.status}</h2>
                <h2><b className=''>Content : </b>{parse(post.content)}</h2>
            </div>
        </Container>
    ) : null;
}

export default PostPage