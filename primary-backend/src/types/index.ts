import {z} from "zod"

export const signUpSchema = z.object({
    username:z.string().min(5),
    pass:z.string().min(6),
    name:z.string().min(3)
})
export const signinSchema = z.object({
    username:z.string(),
    pass:z.string()
})

export const ZapCreateSchema = z.object({
    avalibletriggerId:z.string(),
    triggerMetadata:z.any().optional(),
    action:z.array(z.object({
       avalibleactionId:z.string(),
        actionMetadata:z.any().optional()
    }))
})