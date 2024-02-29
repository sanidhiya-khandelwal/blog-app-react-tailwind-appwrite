import React, { useCallback, useEffect, useState } from 'react';
import service from '../../appwrite/config';
import { Input, Button, Select, RTE, Container } from '../index';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PostForm({ post }) { //log post

    const [loader, setLoader] = useState(true)

    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',
            blogCategory: post?.blogCategory || 'personal'
        }
    })
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData) //log userData

    useEffect(() => {
        const delay = setTimeout(() => {
            setLoader(false)
        }, 2000);

        return () => clearTimeout(delay)
    }, [])



    const submit = async (data) => {
        // update post
        if (post) {
            const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;

            if (file) {
                service.deleteFile(post.featuredImage)
            }
            const dbPost = await service.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            })
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } //creating a new post
        else {
            const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;

            if (file) {

                const fileId = file.$id;
                data.featuredImage = fileId
                const dbPost = await service.createPost({
                    ...data,
                    userId: userData.userData.$id
                })
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value
                .trim()
                .toLowerCase()
                .replace(/\s/g, '-')
        }

        return ''
    }, [])

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title, { shouldValidate: true }))
            }
        });

        return () => {
            subscription.unsubscribe();
        }
    }, [watch, slugTransform, setValue])

    if (loader) {
        return <div className='flex items-center justify-center'>
            <img className='m-auto mt-5 h-full' src="/src/assets/spinner.gif" alt="spinner" />
        </div>
    }


    return (
        <Container className='py-5 bg-slate-100'>
            <form onSubmit={handleSubmit(submit)} className='flex flex-wrap border py-5 px-1'>
                <div className='md:w-2/3 px-2'>
                    <Input
                        label="Title : "
                        placeholder="Enter title"
                        className='mb-2'
                        {...register("title", { required: true })}
                    />
                    <Input
                        label="Slug : "
                        placeholder="Slug"
                        className='mb-2'
                        {...register("slug", { required: true })}
                        onInput={(e) => {
                            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })
                        }}
                    />
                    <RTE label="Description : " name="content" control={control} defaultValue={getValues("content")} />
                </div>
                <div className='md:w-1/3 px-2'>
                    <Input
                        label="Featured Image : "
                        type="file"
                        className="mb-4"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: !post })} //for updating existing post it is not required but for new post(post will be empty so !empty = true) it is required
                    />
                    {post && (
                        <div className="w-full mb-4">
                            <img
                                src={service.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className="rounded-lg"
                            />
                        </div>
                    )}
                    <Select
                        options={["personal", "lifestyle", "fashion", "travel", "food", "technology", "books", "handicraft"]}
                        label="Category : "
                        className="mb-10"
                        {...register("blogCategory", { required: true })}
                    />
                    <Select
                        options={["active", "inactive"]}
                        label="Status : "
                        className="mb-4"
                        {...register("status", { required: true })}
                    />
                    <Button type='submit' bgColor={post ? "bg-green-500" : undefined} className='w-full'>
                        {post ? "Update" : "Submit"}
                    </Button>
                </div>
            </form>
        </Container>
    )
}

export default PostForm