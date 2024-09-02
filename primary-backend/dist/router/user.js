"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const middleware_1 = require("../middleware");
const types_1 = require("../types");
const db_1 = require("../db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const router = (0, express_1.Router)();
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    console.log(body);
    const parseData = types_1.signUpSchema.safeParse(body);
    console.log(parseData.error);
    if (!parseData.success) {
        return res.status(411).json({
            message: "Incorrect Input"
        });
    }
    const userExists = yield db_1.prismaClient.user.findFirst({
        where: {
            email: parseData.data.username
        }
    });
    if (userExists) {
        return res.status(403).json({
            message: "User Already Exists"
        });
    }
    yield db_1.prismaClient.user.create({
        data: {
            email: parseData.data.username,
            pass: parseData.data.pass,
            name: parseData.data.name
        }
    });
    return res.json({
        message: "Please verify your account by checking your email"
    });
}));
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const parseData = types_1.signinSchema.safeParse(body);
    if (!parseData.success) {
        return res.status(411).json({
            message: "Incorrect Input"
        });
    }
    const user = yield db_1.prismaClient.user.findFirst({
        where: {
            email: parseData.data.username,
            pass: parseData.data.pass
        }
    });
    if (!user) {
        return res.status(403).json({
            message: "Unauthrize , wrong credentials "
        });
    }
    const token = jsonwebtoken_1.default.sign({
        id: user.id
    }, config_1.JWT_PASS);
    res.json({
        token: token,
    });
}));
router.get("/", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const id = req.id;
    const user = yield db_1.prismaClient.user.findFirst({
        where: {
            id
        },
        select: {
            name: true,
            email: true
        }
    });
    return res.json({
        user
    });
}));
exports.userRouter = router;
