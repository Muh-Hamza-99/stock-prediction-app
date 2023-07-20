const express = require("express");
const router = express.Router();

const {
  getOneUser,
} = require("../controllers/user-controllers.js");

const {
    register, 
    login
} = require("../controllers/auth-controllers");

const protect = require("../middleware/protect");

router.post("/register", register);
router.post("/login", login);

router.get("/:id", protect, getOneUser);

module.exports = router;