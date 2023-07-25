import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const GetBlogData = async()=>{
  const data = await fetch('http://localhost:3000/api/blogs', { next: { revalidate: 1 } });
  const resData = await data.json();
  return resData.data ;
}



export default async function Home() {
  const posts = await GetBlogData();
  //console.log('-----', posts);
  return (
    <>
      <div className='max-w-2xl text-center m-auto'>
        <h1 className='mt-5'>Hello Next Js CRUD operation with API</h1>

        <div className='text-right'>
          <Link href="/blog/add" className='text-lg bg-slate-100 text-gray-800 p-1 rounded-md'>Add a New Blog!!</Link>
        </div>

        {
          posts && posts.length > 0 ? posts.map((post:any)=>{
            return (<div key={post.id} className='flex justify-between text-left mt-2 bg-slate-400 p-2 m-2'>
            <div className='text-black'>
              <p>Title:- {post.title}</p>
              <p>Discurption:- {post.description}</p>
            </div>
            <div className=''>
              <Link href={`/blog/edit/${post.id}`} className='text-lg bg-slate-100 text-gray-800 p-1 rounded-md'>Edit</Link>
            </div></div>)
          })  : "data is not there"
        }
        
        <ToastContainer />
      </div>
    </>
  )
}
