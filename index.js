const express = require("express")
const cors = require("cors")
const connection = require("./connection")
const Router  = require("./Routes/routes")
require("dotenv").config()

const PORT = process.env.PORT || 3001 

const app = express();

app.use(express.json());
app.use(cors());

app.use("/",Router)

connection.sync().then(()=>{
    console.log("Database connected...")
}).catch((err)=>{
    console.log("Failed to connect to the database : ",err)
});

app.listen(PORT,()=>{
    console.log("Server is running...")
})