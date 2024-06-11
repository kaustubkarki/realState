import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoute from "./routes/auth.route.js";

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

app.listen(port, () => {
  console.log(
    `server is running on port: ${port} and client in ` + process.env.CLIENT_URL
  );
});
