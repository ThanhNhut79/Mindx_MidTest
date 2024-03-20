import userRouter from "./userRoutes.js";
const routes = (app) => {
  app.use("/user", userRouter);
};
export default routes;
