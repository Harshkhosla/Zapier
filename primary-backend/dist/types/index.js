"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinSchema = exports.signUpSchema = void 0;
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
