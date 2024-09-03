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
Object.defineProperty(exports, "__esModule", { value: true });
exports.zapRouter = void 0;
const express_1 = require("express");
const middleware_1 = require("../middleware");
const types_1 = require("../types");
const db_1 = require("../db");
const router = (0, express_1.Router)();
router.post("/", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    //@ts-ignore
    const id = req.id;
    const parsData = types_1.ZapCreateSchema.safeParse(body);
    if (!parsData.success) {
        return res.status(411).json({
            message: "Not valid persone"
        });
    }
    yield db_1.prismaClient.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const zap = yield db_1.prismaClient.zap.create({
            data: {
                userId: id,
                triggerId: "",
                actions: {
                    create: parsData.data.action.map((x, index) => ({
                        actionId: x.avalibleactionId,
                        sortingOrder: index,
                    }))
                }
            }
        });
        const trigger = yield tx.trigger.create({
            data: {
                triggerId: parsData.data.avalibletriggerId,
                zapId: zap.id
            }
        });
        yield db_1.prismaClient.zap.update({
            where: {
                id: zap.id
            },
            data: {
                triggerId: trigger.id
            }
        });
    }));
}));
router.get("/", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const id = req.id;
    const zaps = yield db_1.prismaClient.zap.findMany({
        where: {
            userId: id
        }, include: {
            actions: {
                include: {
                    type: true
                }
            },
            trigger: {
                include: {
                    type: true
                }
            }
        }
    });
    return res.json({
        zaps
    });
}));
router.get("/:zapId", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const id = req.id;
    const zapId = req.params.zapId;
    const zap = yield db_1.prismaClient.zap.findFirst({
        where: {
            id: zapId,
            userId: id
        }, include: {
            actions: {
                include: {
                    type: true
                }
            },
            trigger: {
                include: {
                    type: true
                }
            }
        }
    });
    return res.json({
        zap
    });
}));
exports.zapRouter = router;
