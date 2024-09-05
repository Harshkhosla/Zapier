import { Router } from "express";
import { authMiddleware } from "../middleware";
import { signinSchema, signUpSchema } from "../types";
import { prismaClient } from "../db";
import jwt from "jsonwebtoken"
import { JWT_PASS } from "../config";
const router = Router();

router.get("/avalible",async(req,res)=>{
    const avalibleActions=await prismaClient.avalibleAction.findMany({})
    res.json({
        avalibleActions
    })
})

export const ActionRouter = router;