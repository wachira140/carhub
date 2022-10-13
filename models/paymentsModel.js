const mongoose = require('mongoose')

const PaymentsSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        required:[true, 'The user is required']
    },
    total:{
        type:Number,
        required:true,
        maxlength:7
    },
    status:{
        type:String,
        enum:['Pending', 'Paid', 'Failed'],
        default:'Pending'
    },
    payment_method:String,
    account:String,
    Phone_Number:Number,
    items:Number,
    products:[]
},
{timestamps:true})

module.exports = mongoose.model('Payments', PaymentsSchema)
