import express from "express"
import { zapRouter } from "./router/zap";
import { userRouter } from "./router/user";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors())

app.use("/api/vi/user",userRouter)
app.use("/api/vi/zap",zapRouter)
app.listen(3000)