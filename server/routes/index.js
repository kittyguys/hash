import authRoutes from "./auth";
import userRoutes from "./users";
import { errorHandler, logErrors } from "../middlewares/error";

export const initRouter = server => {
  server.use("*", (req, res, next) => {
    console.log("Request was made to: " + req.originalUrl);
    return next();
  });

  server.use("/api", authRoutes);
  server.use("/api", userRoutes);
  // error handling
  server.use(logErrors);
  server.use(errorHandler);
};
