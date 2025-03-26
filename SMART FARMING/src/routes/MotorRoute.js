const express = require("express");
const MotorStatusController = require("../controller/MotorStatusController");

const router = express.Router();

router.post("/addStatus", MotorStatusController.addStatus);

module.exports = router;
