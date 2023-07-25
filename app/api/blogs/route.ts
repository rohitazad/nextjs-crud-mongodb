import { NextResponse } from "next/server"
import prisma from "@/prisma";

export const dbConnect = async ()=>{
    try {
        await prisma.$connect();
    } catch (error) {
        return Error("Database connection error")
    }
}

export const GET = async (req:Request, res:Response)=>{
    try {
        await dbConnect();
        const blogs = await prisma.post.findMany();
        return NextResponse.json({
            message:"ok",
            data:blogs
        },
        {
            status:200
        })
    } catch (error) {
        return NextResponse.json({
            error,
            message:"Error"
        },
        {
            status:500
        })
    } finally{
        await prisma.$disconnect();
    }
}

// post Request Data here

export const POST = async (req:Request, res:Response)=>{
    try {
       const {title, description, username} = await req.json(); 
       await   dbConnect();
       const post = await prisma.post.create({
        data:{title, description,username}
       })
       return NextResponse.json({
        message:"Data Successfully created",
        data:post
       },
       {
        status:201
       })
    } catch (error) {
        return NextResponse.json({
            message:"Error",
            error
        },
        {
            status:500
        })
    } finally{
        await prisma.$disconnect();
    }
}