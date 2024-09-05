import express from "express"
import { zapRouter } from "./router/zap";
import { userRouter } from "./router/user";
import cors from "cors";
import { ActionRouter } from "./router/actions";
import { TriggersRouter } from "./router/trigger";

const app = express();
app.use(express.json());
app.use(cors())

app.use("/api/vi/user",userRouter)
app.use("/api/vi/zap",zapRouter)
app.use("/api/vi/triggers",TriggersRouter)
app.use("/api/vi/actions",ActionRouter)
app.listen(3000)