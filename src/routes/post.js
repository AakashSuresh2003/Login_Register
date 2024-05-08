const express=require("express")
const router=express.Router()
const upload = require("../middleware/upload")
const authMiddleWare = require("../middleware/authMiddleware")
const { createPostController, createPostWithImage } = require("../controller/postController")

router.use(authMiddleWare)

router.post("/create",createPostController)

router.post("/create/image",upload.array("image"),createPostWithImage)


module.exports = router