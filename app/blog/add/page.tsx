"use client"
import React, {useRef} from 'react';
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddPostData = async (username:string, title:string, description:string)=>{
    try {
        const postData =  {title, description, username}
        const res = await fetch('http://localhost:3000/api/blogs',{
            method:"POST",
            body:JSON.stringify(postData),
            // @ts-ignore
            "Content-Type":"application/json"
        });
        const resData = await res.json();
        return resData;
    } catch (error) {
        
    }
}

const AddBlog = ()=>{
    const router = useRouter();
    const nameRef = useRef<HTMLInputElement | null>(null);
    const titleRef = useRef<HTMLInputElement | null>(null);
    const discruption = useRef<HTMLTextAreaElement | null>(null);
    
    
    const formSubmitHandler = async (e:any)=>{
        e.preventDefault();
        const title = titleRef.current?.value;
        const name = nameRef.current?.value;
        const description = discruption.current?.value;
        if(title && name && description){
           await AddPostData(name, title, description );
           toast.success("blog posted succesffuly", {
            onClose: ()=>{
                router.push("/")
            }
           });
            
        }
        
        
        
    }
    
    return (
        <div className='max-w-2xl text-center m-auto'>
            <h1 className='mt-5'>Add Blog</h1>
            <div className="bg-white p-4 m-2 rounded-sm">
                <form onSubmit={formSubmitHandler}>
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
                        <button  className="text-lg bg-slate-900 text-white hover:text-gray-200 hover:bg-gray-500 rounded-md py-1 px-2">Submit</button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default AddBlog;