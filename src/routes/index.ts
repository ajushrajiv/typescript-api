import Router from "express";
import TodoRouter from "./todo";
import MemberRouter from "./member";

const AppRouter = Router();

AppRouter.use("/todo", TodoRouter);
AppRouter.use("/member", MemberRouter);

export default AppRouter;