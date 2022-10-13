const mongoose = require('mongoose')

const FollowersSchema = new mongoose.Schema({
    _id:
        {
            type: mongoose.Schema.ObjectId,
             ref:'User',
        },

    followers:[
        {
            user:mongoose.Schema.ObjectId,
            user_type:String,
            user_name:String
            // link:String
        },
    ],
    blocked_users:[
        {
            user:mongoose.Schema.ObjectId
        },
    ],
    followRequests:[
        {
            user:mongoose.Schema.ObjectId,
            user_name:String,
            status:{
                type:String,
                enum:['Accepted', 'Pending', 'Rejected'],
                default:'Pending'
            }
        }
    ],
})

module.exports = mongoose.model('FollowersModel',FollowersSchema)