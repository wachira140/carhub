
const Motors = require("../models/motorModel")
const Payments = require('../models/paymentsModel')
const {StatusCodes} = require('http-status-codes')

const payActivation = async(req, res) =>{
    const {items, method, mpesaNum} = req.body
    const user = req.user
    const amount = 400
    const items_num = items.length
    const total = amount * items_num

    if (method == 'till'){
        // send prompt to mpesaNum

        // const paid_items = await Payments.findOne({_id:})
      const createPayment =  await Payments.create({
            user,
            total,
            items:items_num,
            products:items,
            phone_Number:mpesaNum,
            payment_method:method, 
        })

        // send confirmation email
        return res.status(StatusCodes.CREATED).json({payment:createPayment})
    }

        const account = 'sjsskskskkskk'

        const createPayment =  await Payments.create({
            user,
            total,
            items:items_num,
            products:items,
            phone_Number:mpesaNum,
            account,
            payment_method:method,
        })

        res.status(StatusCodes.CREATED).json({payment:createPayment})
}

module.exports = {
    payActivation,
}