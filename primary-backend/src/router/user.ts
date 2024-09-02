import { Router } from "express";
import { authMiddleware } from "../middleware";
import { signinSchema, signUpSchema } from "../types";
import { prismaClient } from "../db";
import jwt from "jsonwebtoken"
import { JWT_PASS } from "../config";
const router = Router();

router.post("/signup", async (req, res) => {
    const body = req.body;

    console.log(body);
    const parseData = signUpSchema.safeParse(body);
console.log(parseData.error);

    if (!parseData.success) {
        return res.status(411).json({
            message: "Incorrect Input"
        })
    }

    const userExists = await prismaClient.user.findFirst({
        where: {
            email: parseData.data.username
        }
    });

    if (userExists) {
        return res.status(403).json({
            message: "User Already Exists"
        })
    }

    await prismaClient.user.create({
        data: {
            email: parseData.data.username,
            pass: parseData.data.pass,
            name: parseData.data.name
        }
    })

    return res.json({
        message: "Please verify your account by checking your email"
    })

})

router.post("/signin", async (req, res) => {
    const body = req.body;
    const parseData = signinSchema.safeParse(body);

    if (!parseData.success) {
        return res.status(411).json({
            message: "Incorrect Input"
        })
    }

    const user = await prismaClient.user.findFirst({
        where: {
            email: parseData.data.username,
            pass: parseData.data.pass
        }
    })

    if (!user) {
        return res.status(403).json({
            message: "Unauthrize , wrong credentials "
        })
    }

    const token = jwt.sign({
        id: user.id
    }, JWT_PASS)

    res.json({
        token: token,
    })
})



router.get("/", authMiddleware, async(req, res) => {
   //@ts-ignore
        const id = req.id;
        const user= await prismaClient.user.findFirst({
            where:{
                id
            },
            select:{
                name:true,
                email:true
            }
        })

        return res.json({
            user
        })
})

export const userRouter = router;