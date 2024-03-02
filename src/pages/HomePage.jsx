import React, { useState, useEffect } from 'react'
import service from '../appwrite/config'
import { PostCard, Container, Button } from '../components/index'
import { useSelector } from 'react-redux';
import { login } from '../store/authSlice';
import { useDispatch } from 'react-redux';
import { getPostsReducer } from '../store/postsSlice';

function HomePage() {

    const dispatch = useDispatch();
    const [posts, setPosts] = useState([]);
    const authStatus = useSelector(state => state.auth.status)
    const allPosts = useSelector(state => state.posts.postsData)


    const filters = ["All", "personal", "lifestyle", "fashion", "travel", "food", "technology", "books", "handicraft"];

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


    //runs when user is not logged in
    if (!authStatus) {
        return (
            <div className="flex flex-wrap w-full h-[60vh] items-center justify-center">
                <h1 className="text-2xl font-bold hover:text-gray-500">
                    Login to read posts
                </h1>
            </div>
        )

    }


    const filterCategory = (filterType) => {
        if (filterType === "All") {
            setPosts(allPosts.documents)
        }
        else {
            setPosts(allPosts.documents.filter(e => e.blogCategory === filterType))
        }
    }
    return (
        <Container>
            <div className='text-[0.8rem] sm:text-[0.9rem]'>
                <div className='font-semibold text-xl'>Filters</div>
                <div className='flex flex-wrap gap-2 mt-2'>
                    {
                        filters.map(filter => (
                            <button
                                key={filter}
                                className='text-white px-3 py-[0.15rem] rounded-md w-auto bg-slate-500'
                                onClick={() => filterCategory(filter)}
                            >
                                {filter}
                            </button>
                        ))
                    }
                </div>
            </div>
            {
                posts.length > 0 ? (
                    <div className='flex flex-wrap justify-center sm:justify-between gap-5 sm:gap-10'>
                        {
                            posts.map(post => (
                                <div key={post.$id}>
                                    <PostCard {...post} />
                                </div>)
                            )
                        }
                    </div>
                ) : (
                    <div className='w-full h-[70vh] flex justify-center items-center'>
                        <h1 className='font-semibold text-xl sm:text-2xl'>No posts created for this category😑</h1>
                    </div>
                )
            }
        </Container>
    );

}

export default HomePage