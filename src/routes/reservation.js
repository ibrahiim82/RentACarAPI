"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// routes/reservation:
const reservation = require("../controllers/reservation");

const {
  isLogin,
  isStaffOrAdmin,
  isAdmin,
} = require("../middlewares/permissions");

router
  .route("/")
  .get(isLogin, reservation.list)
  .post(isLogin, reservation.create);
router
  .route("/:id")
  .get(isLogin, reservation.read)
  .put(isStaffOrAdmin, reservation.update)
  .patch(isStaffOrAdmin, reservation.update)
  .delete(isAdmin, reservation.delete);

  module.exports = router
