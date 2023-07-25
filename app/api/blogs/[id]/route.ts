import { NextResponse } from "next/server"
import prisma from "@/prisma";

import {dbConnect} from '../route';


export const GET = async (req:Request, res:Response)=>{
    try {
        const id = req.url.split('/blogs/')[1];
        await dbConnect();
        const blogData = await prisma.post.findFirst({where:{id}});
        if(!blogData){
            return NextResponse.json({
                message:"Not found"
            },
            {
                status:404
            })
        }
        return NextResponse.json({
            message:"ok",
            data:blogData
        },
        {
            status:200
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
        await prisma.$disconnect
    }
}


export const PUT = async (req:Request, res:Response)=>{
    try {
        const id = req.url.split('/blogs/')[1];
        const {title, description, username} = await req.json(); 
        await dbConnect();
        const blogData = await prisma.post.update({
            data:{title, description, username},
            where:{id}
        });
        
        return NextResponse.json({
            message:"your data successfully updated",
            data:blogData
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
        await prisma.$disconnect
    }
}


export const DELETE = async(req:Request, res:Response)=>{
    try {
        const id = req.url.split('/blogs/')[1];
        await dbConnect();
        const blogData = await prisma.post.delete({
            where:{id}
        });
        return NextResponse.json({
            message:"Your post is successfully remove",
            data:blogData
        },
        {
            status:200
        })
    } catch (error) {
        return NextResponse.json({
            message:"Error",
            error
        },
        {
            status:500
        })
    }finally{
        await prisma.$disconnect
    }
}