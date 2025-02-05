"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/car:
// const car = require('../controllers/car')
// const permissions = require('../middlewares/permissions')
const {list,create,read,update,deleteCar} = require('../controllers/car')
const {isLogin,isStaffOrAdmin,isAdmin} = require('../middlewares/permissions')
//! routes'da delete karışıklığını gidermek için destrucure ederiz fakat swagger kullanamayız çünkü swagger controllers temelinde çalışır routesda çalışmaz

router.route('/').get(list).post(isStaffOrAdmin,create)
router.route('/:id').get(read).put(isStaffOrAdmin,update).patch(isStaffOrAdmin,update).delete(isAdmin,deleteCar)

module.exports = router
