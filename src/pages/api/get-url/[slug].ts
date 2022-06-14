import {NextApiRequest,NextApiResponse}from 'next';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';
import { prisma } from '../../../db/client';
export default async(req:NextApiRequest,res:NextApiResponse)=>{
    const slug=req.query["slug"];
    if (!slug){
        res.statusCode=404;
        res.send(JSON.stringify({"message":"slug not found"}))
        return
    }
    const data=await prisma.shortLink.findFirst({
        where:{
            slug:{
                equals:slug
            }
        }
     })
     if(!data){
        res.statusCode=404;
        res.setHeader("Content-Type","application/json");
        res.setHeader("Access-Control-Allow-Origin","*");
        res.setHeader("Cache-Control","s-maxage=1000000, stale-while-revalidate");
        res.send(JSON.stringify({"message":"slug not found"}))
        return
     }
     //console.log(data)
     return res.json(data)
}