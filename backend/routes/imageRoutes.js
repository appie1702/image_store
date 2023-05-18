const express = require("express")
const router = express.Router();
const {uploadImage, allimages, updateCount, searchImages} = require('../controllers/imageController')


router.route("/").post(uploadImage)
router.route("/").get(allimages)
router.route("/count").post(updateCount)
router.route("/search").post(searchImages)

module.exports = router;