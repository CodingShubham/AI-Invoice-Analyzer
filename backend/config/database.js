const mongoose=require("mongoose");

const connectDB=async ()=>{

    await mongoose.connect("mongodb+srv://Shubham:zZC5HH8pYQeHgxMe@cluster0.pxwfp12.mongodb.net/InvoiceDB?appName=Cluster0");
}


module.exports=connectDB;

