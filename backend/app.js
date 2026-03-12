const express=require("express")
const connectDB=require("./config/database");
const UserRouter = require("./Routes/user");
const invoiceRouter=require("./Routes/invoice")
const cookieParser=require("cookie-parser")

const app=express();

app.use(express.json())
app.use(cookieParser())

app.post("/",(req,res)=>{
    res.send("hello shubham");
})


connectDB().then(()=>{

    console.log("Databse Connected Sucessfully");

    app.listen("3000",()=>{
    console.log("server started and listening on port 3000");
})


}).catch((err)=>{

       console.log("error", err);

})

app.use("/",UserRouter);
app.use("/",invoiceRouter);


