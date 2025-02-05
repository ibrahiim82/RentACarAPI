"use strict"

const router = require('express').Router()

// ROUTER INDEX

// URL: 


router.use('/auth', require('./auth'))
router.use('/users', require('./user'))
router.use('/cars', require('./car'))
router.use('/tokens', require('./token'))
router.use('/reseravtions', require('./reservation'))

module.exports = router