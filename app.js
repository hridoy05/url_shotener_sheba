import express from "express";
import urlRoutes from "./routes/urlRoutes.js";
import notFoundMiddleware from "./midddleware/not-found.js";

const app = express();

app.use(express.json()); 
app.use("/api/urls", urlRoutes);

app.use(notFoundMiddleware)

export default app;
