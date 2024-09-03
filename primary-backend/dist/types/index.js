"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZapCreateSchema = exports.signinSchema = exports.signUpSchema = void 0;
const zod_1 = require("zod");
exports.signUpSchema = zod_1.z.object({
    username: zod_1.z.string().min(5),
    pass: zod_1.z.string().min(6),
    name: zod_1.z.string().min(3)
});
exports.signinSchema = zod_1.z.object({
    username: zod_1.z.string(),
    pass: zod_1.z.string()
});
exports.ZapCreateSchema = zod_1.z.object({
    avalibletriggerId: zod_1.z.string(),
    triggerMetadata: zod_1.z.any().optional(),
    action: zod_1.z.array(zod_1.z.object({
        avalibleactionId: zod_1.z.string(),
        actionMetadata: zod_1.z.any().optional()
    }))
});
