import express from "express";

const app = express();
const port = 5000;

// creating api end point 
app.use("/api/test",(req,res) =>{
    res.send("okay it works");
});

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
//9:44