import React, { useEffect, useState } from 'react'
import { Container, PostCard } from '../components/index'
import { useDispatch } from 'react-redux';
import { getPostsReducer } from '../store/postsSlice';
import { useSelector } from 'react-redux';
import service from '../appwrite/config';

function AllPostsPage() {
    const dispatch = useDispatch();
    const [posts, setPosts] = useState([]);
    const allPosts = useSelector(state => state.posts.postsData)

    useEffect(() => {
        //Runs when tab swtich is done and page is not refreshed, data is fetched from Redux and set in posts useState 
        if (allPosts) {
            setPosts(allPosts.documents)
        }
        // Runs when page refresh happens & data is again fetched from db & dispatched in redux & also set in posts useState 
        const fetchPosts = async () => {
            try {
                const posts = await service.getAllPosts([]);
                if (posts) {
                    dispatch(getPostsReducer(posts));
                    setPosts(posts.documents)
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts();
    }, [dispatch]);

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