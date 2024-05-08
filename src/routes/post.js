const express=require("express")
const router=express.Router()
const upload = require("../middleware/upload")
const authMiddleWare = require("../middleware/authMiddleware")
const { createPostController, createPostWithImage, getPost, updatePost, deletePost } = require("../controller/postController")

router.use(authMiddleWare)

router.get("/",getPost);

router.post("/create",createPostController)

router.post("/create/image",upload.array("image"),createPostWithImage)

router.put("/edit/:id",upload.array("image"),updatePost);

router.delete("/delete/:id",deletePost);

module.exports = router