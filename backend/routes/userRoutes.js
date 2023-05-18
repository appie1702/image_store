const express = require("express")
const router = express.Router();
const {registerUser, loginUser, isauthUser,logoutUser} = require("../controllers/userController");

router.route('/').post(registerUser)
router.post('/login', loginUser)
router.route('/isauth').get(isauthUser)
router.route('/logout').get(logoutUser)
module.exports = router;