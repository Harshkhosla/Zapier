import {Router } from "express";
import { authMiddleware } from "../middleware";

const router = Router();



router.post("/",authMiddleware,(req,res)=>{
    console.log("signin");
    
})
router.get("/",authMiddleware,(req,res)=>{
    console.log("signin");
    
})
router.get("/:zapId",authMiddleware,(req,res)=>{
    console.log("signin");
    
})

export const zapRouter= router;