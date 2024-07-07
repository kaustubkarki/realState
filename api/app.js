import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoute from "./routes/auth.route.js";
import testRoute from "./routes/test.route.js";
import postRoute from "./routes/test.route.js";

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

app.listen(port, () => {
  console.log(
    `server is running on port: ${port} and client in ` + process.env.CLIENT_URL
  );
});

//TODO 1:30:17 => REACT CONTECT AUTH
