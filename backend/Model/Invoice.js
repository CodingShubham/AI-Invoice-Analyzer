const mongoose=require("mongoose");

// const inVoiceSchema=new mongoose.Schema({


//     invoiceNumber:{
//         type:String,
//         required:true,
//     },

//     vendor:{

//         type:String,
//         required:true,
//     },

//     amount:{
//         type:Number,
//         required:true,

//     },

//     invoiceDate:{
//         type:Date,
//         required:true,
//     },

//     flags: {

//         type: [

//             {
//                 type: String,
//             },
//         ]

//     },

//     riskScore:{

//         type:Number,
//         default:0,
//     },

//     uploadedBy:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"User",
//         required:true,
//     }


// }, {timestamps:true})



const inVoiceSchema = new mongoose.Schema({

    invoiceNumber:{
        type:String,
        required:true,
        trim:true
    },

    vendor:{
        type:String,
        required:true,
        trim:true
    },

    amount:{
        type:Number,
        required:true,
    },

    invoiceDate:{
        type:Date,
        required:true,
    },

   
    fileUrl:{
        type:String,
    },

 
    extractedText:{
        type:String,
    },

    flags: {
        type: [String],
        default: []
    },

    riskScore:{
        type:Number,
        default:0,
    },

  
    aiScore:{
        type:Number,
        default:0,
    },

    riskLevel:{
        type:String,
        enum:["Low","Medium","High"],
        default:"Low"
    },

    uploadedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }

}, {timestamps:true})


const Invoice=mongoose.model("Invoice",inVoiceSchema)

module.exports = Invoice;