import {Router } from "express";
import { authMiddleware } from "../middleware";
import { ZapCreateSchema } from "../types";
import { prismaClient } from "../db";

const router = Router();



router.post("/",authMiddleware,async(req,res)=>{
   const body = req.body ;
   //@ts-ignore
   const id = req.id;

   const parsData = ZapCreateSchema.safeParse(body);
   if(!parsData.success){
    return res.status(411).json({
        message:"Not valid persone"
    })
   }


const zapId = await prismaClient.$transaction(async tx=>{
 const zap=    await prismaClient.zap.create({
        data:{
            userId:id,
            triggerId:"",
            actions:{
                create:parsData.data.action.map((x,index)=>({
                    actionId:x.avalibleactionId,
                    sortingOrder:index,
                }))        
            }
        }
})

const trigger = await tx.trigger.create({
    data:{
        triggerId:parsData.data.avalibletriggerId,
        zapId: zap.id
    }
})

await prismaClient.zap.update({
    where:{
        id:zap.id
    },
    data:{
        triggerId:trigger.id
    }
})

 return zap.id;
   })
   return res.json({
    zapId
   })
    
})
router.get("/",authMiddleware,async (req,res)=>{
    // @ts-ignore
    const id = req.id;

    const zaps = await prismaClient.zap.findMany({
        where:{
            userId:id
        },include:{
            actions:{
                include:{
                    type:true
                }
            },
            trigger:{
                include:{
                    type:true
                }
            }
        }
    })

    return res.json({
        zaps
    })

    
})
router.get("/:zapId",authMiddleware, async(req,res)=>{
     // @ts-ignore
     const id = req.id;
  const zapId = req.params.zapId
     const zap = await prismaClient.zap.findFirst({
         where:{
            id:zapId,
             userId:id
         },include:{
             actions:{
                 include:{
                     type:true
                 }
             },
             trigger:{
                 include:{
                     type:true
                 }
             }
         }
     })
 
     return res.json({
         zap
     })
 
    
})

export const zapRouter= router;