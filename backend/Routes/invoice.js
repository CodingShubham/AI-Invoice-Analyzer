const express=require("express");
const User=require("../Model/User")
const Invoice=require("../Model/Invoice");
const authUser=require("../Middleware/authMiddleware")
const invoiceRouter=express.Router();
const fs = require("fs");
const pdf = require("pdf-parse");
const upload=require("../Middleware/uploadMiddleware")



invoiceRouter.post("/invoice", authUser, upload.single("invoiceFile"), async(req,res)=>{

    const{invoiceNumber,vendor,amount,invoiceDate}=req.body;

    try{
         if (!req.file) {
            return res.status(400).json({ message: "Invoice file is required" });
        }

        const filePath=req.file.path;

        const fileRead= fs.readFileSync(filePath);

        const data=await pdf(fileRead);

        const extractedData=data.text;

        // console.log(extractedData);

        const invoiceMatch = extractedData.match(/Invoice\s*Number\s*:\s*([A-Za-z0-9-]+)/i);
        const amountMatch = extractedData.match(/TOTAL:\s*₹?[0-9,]+\.\d{2}\s*₹?([0-9,]+\.\d{2})/i);
        const dateMatch=extractedData.match(/Invoice\s*Date\s*:\s*([0-9]{2}\.[0-9]{2}\.[0-9]{4})/i);
        const vendorMatch = extractedData.match(/Sold\s*By\s*:\s*([^\n]+)/i);

        
          

      const invoiceNumber = invoiceMatch ? invoiceMatch[1].trim() : "Unknown";
      const vendor = vendorMatch ? vendorMatch[1].trim() : "Unknown Vendor";
     const amount = amountMatch ? Number(amountMatch[1].replace(/,/g, "")) : 0;
    //   const invoiceDate = dateMatch ? new Date(dateMatch[1].trim()) : new Date();

        let invoiceDate = new Date();

        if (dateMatch) {
            const rawDate = dateMatch[1].trim(); // 24.02.2026
            const [day, month, year] = rawDate.split(".");
            invoiceDate = new Date(`${year}-${month}-${day}`);
        }

        console.log("invoiceNumber raw:", invoiceMatch?.[1]);
        console.log("vendor raw:", vendorMatch?.[1]);
        console.log("amount raw:", amountMatch?.[1]);
        console.log("date raw:", dateMatch?.[1]);

        const existingInvoice= await Invoice.findOne({invoiceNumber, vendor});


        let flags = [];
        let riskScore = 0;

        if(existingInvoice){
            flags.push("Duplicate invoice detected");
            riskScore += 40;
        }

        const newInvoice = await Invoice.create({
            invoiceNumber, vendor, amount, invoiceDate, flags,fileUrl:req.file.path,
            riskScore, uploadedBy: req.user._id,
        });

        res.status(200).json({ message: "Invoice uploaded & processed successfully",
        extractedData: {
          invoiceNumber,
          vendor,
          amount,
          invoiceDate,
          flags,
          riskScore,
         
        }, newInvoice});


    }


    catch(err){

        res.status(500).json({error:err.message});

    }


})


invoiceRouter.get("/invoice", authUser, async(req,res)=>{

        try{

            const invoices= await Invoice.find({uploadedBy:req.user._id})

            res.status(200).send(invoices);

        }


        catch(err){

            res.status(500).json({error:err.message});

        }

})




invoiceRouter.get("/invoice/:id", authUser, async(req,res)=>{

    const id=req.params.id;

    try{

        const invoice=await Invoice.findById(id);

         if(!invoice){
            return res.status(404).json({message:"Invoice not found"});
        }
        
        res.status(200).send(invoice);

    }

    catch(err){

    res.status(500).json({error:err.message});

    }



})


module.exports=invoiceRouter;