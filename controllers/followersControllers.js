const FollowersModel = require('../models/followersModel')
const Users = require('../models/userModel')
const CustomErrors = require('../errors')
const {StatusCodes} = require('http-status-codes')


const followUser = async(req, res)=>{
    const {id:followThisUser} = req.params
   
    
    if(followThisUser === req.user){
        throw new CustomErrors.BadRequestError('you cannot follow yourself')
    }
    
    
    const currentUser = await Users.findOne({_id:req.user})

    let user;
    
user = await FollowersModel.findOne({_id:followThisUser})
    
    if(user){

        for(let item of user.followers){
        if (item.user == req.user)throw new CustomErrors.BadRequestError('You already follow this user')
        }
        
        let newFollower= {}
        
        newFollower.user = req.user
        newFollower.user_type = currentUser.role
        newFollower.user_name = currentUser.name
        newFollower._id = null
        
        user.followers = [...user.followers, newFollower]

        await user.save()
       return res.status(StatusCodes.OK).json('You followed this user')
    }


    user = await FollowersModel.create({
    _id:followThisUser,
    followers:[
        {
            user:req.user,
            user_type:currentUser.role,
            user_name:currentUser.name,
            _id:null
        }
    ]

    })

    res.status(StatusCodes.CREATED).json('You followed this user')
}


const unFollowUser = async(req, res)=>{
    const {id:userId} = req.params
    const followed = await FollowersModel.findOne({_id:userId})


    if(!followed){
        throw new CustomErrors.BadRequestError(`you dont follow this user`)
    }

    const newFollowers = followed.followers.filter((item)=>{
        return item.user != req.user
    })

   const followers = await FollowersModel.findOneAndUpdate({_id:userId},
   {followers:newFollowers},{
    new:true,
    runValidators:true
   } )

    res.status(StatusCodes.OK).json({followers})
}

const blockUser = async(req, res)=>{
    const {id:blockThisUser} = req.params
   
    
    if(blockThisUser === req.user){
        throw new CustomErrors.BadRequestError('you cannot block yourself')
    }
    
    

    let user;
    
    // find if i have a list of blocked users
user = await FollowersModel.findOne({_id:req.user})
    
    if(user){

        for(let item of user.blocked_users){
        if (item.user == blockThisUser)throw new CustomErrors.BadRequestError('You already blocked this user')
        }
        
        let blocked_User= {}
        
        blocked_User.user = blockThisUser
        blocked_User._id= null
        
        user.blocked_users = [...user.blocked_users, blocked_User]

        await user.save()
       return res.status(StatusCodes.OK).json({msg:'You blocked this user'})
    }


    user = await FollowersModel.create({
    _id:req.user,
    blocked_users:[
        {
            user:blockThisUser,
            _id:null
        }
    ]

    })

    res.status(StatusCodes.CREATED).json({msg:'You blocked this user'})
}



const unBlockUser = async(req, res)=>{
    const {id:userId} = req.params
    const user = await FollowersModel.findOne({_id:req.user})


    if(!user){
        throw new CustomErrors.BadRequestError(`you currently dont have blocked users`)
    }

    const newblockedUsers = user.blocked_users.filter((item)=>{
        return item.user != userId
    })

   const newBlockedList = await FollowersModel.findOneAndUpdate({_id:req.user},
   {blocked_users:newblockedUsers},{
    new:true,
    runValidators:true
   } )

    res.status(StatusCodes.OK).json({newBlockedList})
}


// view who follows me
const viewWhoFollows = async(req, res)=>{
    const followers = await FollowersModel.findOne({_id:req.user})
    if(!followers)throw new CustomErrors.NotFoundError('you have no followers')

    const my_fellowship = followers.followers
    
    res.status(StatusCodes.OK).json({followers:my_fellowship, count:my_fellowship.length}, )
}



const viewYourFollowing = async(req, res)=>{
    const users = await FollowersModel.find({})
    if(!users || users.length == 0)throw new CustomErrors.NotFoundError('No users found')

    let owners = []
    for(item of users){
    let users_followed = item.followers.find((e)=>{
        if(e.user == req.user){
            owners.push(item._id)
        }
    })
    }

    let usersDetails = []
    for (objectId of owners){
        let user = await Users.findOne({_id:objectId}).select('name')
        usersDetails.push(user)
    }
   
    res.status(StatusCodes.OK).json({following:usersDetails})
}


const sendFollowRequest = async(req, res)=>{
    const {id:userId} = req.params

    const user = await Users.findOne({_id:userId})

    if(!user)throw new CustomErrors.NotFoundError(`No user with the id of ${userId}`)

    const current_user = await Users.findOne({_id:req.user})

    const my_follows = await FollowersModel.findOne({_id:userId})

    if(my_follows){

        for(let item of my_follows.followRequests){
            if (item.user == req.user)throw new CustomErrors.BadRequestError(`You already sent a request to ${user.name}`)
            }
            
            let newRequest = {}
            
           newRequest.user = req.user
           newRequest.user_name = current_user.name
            newRequest._id = null
            
            my_follows.followRequests = [...my_follows.followRequests, newRequest]
    
            await my_follows.save()
            // sendFollowRequestEmail
           return res.status(StatusCodes.OK).json({msg:`you sent a request to ${user.name}`})
    

    }


        const sendRequestToThisUser = await FollowersModel.create({
            _id:userId,
            followRequests:[{
                user:req.user,
                user_name:current_user.name,
                _id:null
            }
            ]
        })

        // sendFollowRequestEmail
        res.status(StatusCodes.CREATED).json({msg:`You sent a request to ${user.name}`})



}

const deleteRequest = async(req, res)=>{
    const user = req.user
    const {id:delReqId} = req.params

    const requests = await FollowersModel.findOne({_id:user})
    if(!requests)throw new CustomErrors.NotFoundError('you currently have no requests')

    const user_name= await Users.findOne({_id:delReqId})

    const newRequests = requests.followRequests.filter((e)=>e.user != delReqId)
   
    const newRequestList = await FollowersModel.findOneAndUpdate({_id:user},
        {followRequests:newRequests},{
            runValidators:true,
            new:true
        })
    res.status(StatusCodes.OK).json({msg:`${user_name.name}'s request deleted successfully`})
}




const notifyFollowRequest = async(req, res)=>{
    res.send('notify fellowship request')
}

module.exports = {
    followUser,
    unFollowUser,
    blockUser,
    unBlockUser,
    viewWhoFollows,
    viewYourFollowing,
    sendFollowRequest,
    deleteRequest,
    notifyFollowRequest
}

