const express = require("express");
const NPKController = require("../controller/NpkController");

const router = express.Router();

router.post("/add", NPKController.addNPKData);
router.get("/all", NPKController.getNPKData);

module.exports = router;
