import userRoutes from "./users";

export const initRouter = server => {
  server.get("*", function(req, res, next) {
    console.log("Request was made to: " + req.originalUrl);
    return next();
  });

  server.use("/api", userRoutes);
};
