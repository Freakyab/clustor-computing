const express = require("express");
const cors = require("cors");
const bodyPareser = require("body-parser");
const app = express();

const PORT = process.env.PORT | 8000;

app.use(bodyPareser.json());
app.use(cors());
app.use(express.json());
app.get("/", (req,res)=>{
    res.send("Home");
})

app.use("/account" , require("./controllers/accounts.controller"));

app.listen(PORT, async () => {
    console.log(`Listening on the port ${PORT}`);
  });