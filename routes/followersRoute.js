const express = require('express')
const router = express.Router()
const {authenticateUser} = require("../middlewares/authentication")


const{
    followUser,
    unFollowUser,
    blockUser,
    unBlockUser,
    viewWhoFollows,
    viewYourFollowing,
    sendFollowRequest,
    deleteRequest,
    notifyFollowRequest
} = require('../controllers/followersControllers')

router.route('/').get(authenticateUser, viewWhoFollows)
router.route("/:id")
.post(authenticateUser, followUser)
.patch(authenticateUser,unFollowUser)
router.route('/blockuser/:id').post(authenticateUser, blockUser).patch(authenticateUser, unBlockUser)
router.route('/sendrequest/:id').patch(authenticateUser, sendFollowRequest)
router.route('/deleterequest/:id').patch(authenticateUser, deleteRequest)
router.route('/whoYOuFollow').get(authenticateUser, viewYourFollowing)

router.route('/notification').patch(notifyFollowRequest)

module.exports = router