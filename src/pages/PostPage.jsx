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
    console.log("userData", userData);
    const isAuthor = post && userData ? post.userId === userData.userData.$id : false;


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
                <div className=' bg-slate-100 shadow-lg w-full h-[25rem] flex mt-10'>
                    <img
                        className='relative h-full'
                        src={service.getFilePreview(post.featuredImage)}
                        alt={post.title} />
                </div>
                {
                    isAuthor && (
                        <div className='absolute right-7 top-24 sm:right-16 sm:top-28'>
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className='mr-3 '>Edit</Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>Delete</Button>
                        </div>
                    )
                }
            </div>
            <div className='text-[1.1rem] p-2 flex flex-wrap'>
                <div className='w-2/3'>
                    <h2><b>Title :</b> {post.title}</h2>
                    <h2><b>Category : </b>{post.blogCategory}</h2>
                    <h2><b>Status : </b>{post.status}</h2>
                    <h2><b className=''>Content : </b>{parse(post.content)}</h2>
                </div>
                <div className=' w-1/3'>

                </div>
            </div>
        </Container>
    ) : null;
}

export default PostPage