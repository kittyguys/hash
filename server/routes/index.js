import authRoutes from "./auth";
import userRoutes from "./users";
import { verifyToken } from "../middlewares/auth";
import { errorHandler, logErrors } from "../middlewares/error";

export const initRouter = server => {
  // white list
  server.use("/api", authRoutes);
  // routing
  server.use("*", verifyToken);
  server.use("/api", userRoutes);
  // error handling
  server.use(logErrors);
  server.use(errorHandler);
};
