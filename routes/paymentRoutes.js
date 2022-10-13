const express = require('express')
const Router = express.Router()
const {
    authenticateUser
} = require('../middlewares/authentication')

const {
    payActivation,
} = require('../controllers/paymentControllers')

Router.route('/').post(authenticateUser, payActivation)

module.exports = Router