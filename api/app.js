import express from "express";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";

const app = express();
const port = 5000;

app.use(express.json());
app.use(cookieParser())

// creating api end point
app.use("/api/v1/auth", authRoute);

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
