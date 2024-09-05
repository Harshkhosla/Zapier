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
exports.TriggersRouter = void 0;
const express_1 = require("express");
const db_1 = require("../db");
const router = (0, express_1.Router)();
router.get("/avalible", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const avalibleTriggers = yield db_1.prismaClient.avalibleTrigger.findMany({});
    res.json({
        avalibleTriggers
    });
}));
exports.TriggersRouter = router;
