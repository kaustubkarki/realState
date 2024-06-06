import express from "express";
import authRoute from "./routes/auth.route.js";

const app = express();
const port = 5000;

app.use(express.json())

// creating api end point
app.use("/api/v1/auth", authRoute);

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});

                           