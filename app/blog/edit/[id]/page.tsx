"use client";
import React, {useRef, useEffect} from 'react';
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";


const updatePostBlog = async (id:string, username:any, title:any, description:any)=>{
    const mydata = {title,description,username}
    const res = await fetch(`http://localhost:3000/api/blogs/${id}`,{
        method:"PUT",
        body:JSON.stringify(mydata),
        //@ts-ignore
        "Content-Type":"application/json"
    })
    const resData = await res.json();
    return resData.data;
}

const getBlogDataById = async (id:string)=>{
    const res = await fetch(`http://localhost:3000/api/blogs/${id}`)
    const  resData =  await res.json();
    return resData.data
}
const removePost = async (id:string)=>{
    const res = await fetch(`http://localhost:3000/api/blogs/${id}`, {
        method:"DELETE",
        //@ts-ignore
        "Content-Type":"application/json"
    })
    const resData = await  res.json();
    return resData.data
}


const EditPage = ({params}:{params:{id:string}})=>{
    const id = params.id;
    const router = useRouter();
    const nameRef = useRef<HTMLInputElement | null>(null);
    const titleRef = useRef<HTMLInputElement | null>(null);
    const discruption = useRef<HTMLTextAreaElement | null>(null);

    const formupdateHandler = async (e:any)=>{
        e.preventDefault();
        const title = titleRef.current?.value;
        const name = nameRef.current?.value;
        const description = discruption.current?.value;
        if(title && name && description){
            //@ts-ignore
            await updatePostBlog(id,name, title, description)
            toast.success('Your post is updated successfully', {
                onClose: ()=>{
                    router.push("/")
                }
            });
         }


    }
    const handleDelete = async (e:any)=>{
        e.preventDefault();
       const confirmyesorno =  confirm('are you sure you want to be remove to this blog')
       if(confirmyesorno){
        
        await removePost(id)
        toast.warn('Your post is removed', {
            onClose: ()=>{
                router.push("/")
            }
        });
        
       }
    }
    
    useEffect(()=>{
        toast.info('Fetching Blog details pleas wait ...');
        getBlogDataById(id)
        .then((data)=>{
            if(data.title && data.username && data.description){
                //@ts-ignore
                nameRef.current.value = data.username;
                //@ts-ignore
                titleRef.current.value = data.title;
                //@ts-ignore
                discruption.current.value = data.description;
            }
            toast.success('Fetching Blog details Completed');
        })
    },[])
    return (
        <>
            <div className='max-w-2xl text-center m-auto'>
                <h1 className='mt-5'>Edit Blog {id} <Link className="ml-2 bg-slate-800 p-2 rounded-sm" href={`/`}>back to home</Link></h1>
                <div className="bg-white p-4 m-2 rounded-sm">
                <form onSubmit={formupdateHandler}>
                    <div className="flex text-left">
                        <input ref={nameRef} type="text" placeholder="Enter your name" className="text-black rounded-md p-1 text-lg font-semibold font-serif border-black border-2"/>
                    </div>
                    <div className="flex text-left">
                        <input ref={titleRef} type="text" placeholder="Enter title" className="text-black rounded-md p-1 text-lg font-semibold font-serif border-black border-2 mt-2"/>
                    </div>
                    <div className="flex text-left">
                        <textarea ref={discruption} placeholder="Enter blog disc" className="text-black rounded-md p-1 text-lg font-semibold font-serif border-black border-2 mt-2 w-full"/>
                    </div>
                    <div className="flex mt-2">
                        <button  className="text-lg bg-slate-900 text-white hover:text-gray-200 hover:bg-gray-500 rounded-md py-1 px-2">Update data</button>
                        <button
                        onClick={handleDelete}
                        className="text-lg py-1 px-2 shadow-xl bg-red-400 rounded-lg  m-auto mt-2 hover:bg-red-500 ml-4"
                    >
                        Delete
                    </button>
                    </div>
                </form>
            </div>
            </div>
            
            
            <ToastContainer />
            



        </>
    )
}

export default EditPage;