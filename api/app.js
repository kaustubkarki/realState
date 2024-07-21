import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoute from "./routes/auth.route.js";
import postRoute from "./routes/post.route.js";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";

const app = express();
const port = 5000;

app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// creating api end point
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/posts", postRoute);
app.use("/api/v1/test", testRoute);
app.use("/api/v1/users", userRoute);

app.listen(port, () => {
  console.log(
    `server is running on port: ${port} and client in ` + process.env.CLIENT_URL
  );
});
//2:35:59
