"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zap_1 = require("./router/zap");
const user_1 = require("./router/user");
const cors_1 = __importDefault(require("cors"));
const actions_1 = require("./router/actions");
const trigger_1 = require("./router/trigger");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/vi/user", user_1.userRouter);
app.use("/api/vi/zap", zap_1.zapRouter);
app.use("/api/vi/triggers", trigger_1.TriggersRouter);
app.use("/api/vi/actions", actions_1.ActionRouter);
app.listen(3000);
