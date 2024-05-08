const Post = require("../models/postModel");
const User = require("../models/userModel");

const getPost = async (req, res) => {
    try {
        const userId = req.user.id;
        if(!userId) throw new Error("User Not found");
        const posts = await Post.find({ user: userId })
        res.status(200).json({ posts });
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error", message: err.message });
    }
}


const createPostController = async (req, res) => {
  try {
    const userId = req.user.id;
    const { caption } = req.body;
    if (!userId) throw new Error("User not found");
    
    const newPost = new Post({
        user: userId,
        caption
    });
    await newPost.save();

    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    user.posts.push(newPost._id);
    await user.save();

    res.status(201).json({ message: "Post created successfully!", post: newPost });
  } catch (err) {
    res.status(500).json("Internal Server Error" + err);
  }
};

const generateFileUrl = (filename) => {
    return process.env.URL + `/uploads/${filename}`;
}

const createPostWithImage = async (req, res) => {
    try {
        const userId = req.user.id;
        const { caption } = req.body;
        const files = req.files;
        console.log(files);

        const user = await User.findById(userId);
        if (!user) {
            throw new CustomError("User not found!", 404);
        }

        const imageUrls = files.map(file => {
            const url = generateFileUrl(file.filename);
            console.log('Generated URL:', url);
            return url;
        });
        
        const newPost = new Post({
            user: userId,
            caption,
            image: imageUrls
        });

        await newPost.save();
        user.posts.push(newPost._id);
        await user.save();
        res.status(201).json({ message: "Post created successfully!", post: newPost });
    } catch (err) {
        res.status(500).json("Internal server error" + err);
    }
}


const updatePost = async (req, res) => {
    try {
        const postId = req.params.id;
        console.log(postId);
        const userId = req.user.id;
        const { caption } = req.body;

        // Check if the post exists
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        // Check if the user is authorized to update the post
        if (post.user.toString() !== userId) {
            return res.status(403).json({ error: "Unauthorized access" });
        }

        // Update the post
        post.caption = caption;
        await post.save();

        res.status(200).json({ message: "Post updated successfully", post });
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error", message: err.message });
    }
};

const deletePost = async (req, res) => {
    const postId= req.params.id;
    try {
        const postToDelete=await Post.findById(postId)
        if(!postToDelete){
            throw new Error("Post not found!",404)
        }
        const user=await User.findById(postToDelete.user)
        if(!user){
            throw new Error("User not found!",404)
        }
        user.posts=user.posts.filter(postId=>postId.toString()!==postToDelete._id.toString())
        await user.save()
        await postToDelete.deleteOne()
        res.status(200).json({message:"Post deleted successfully!"})
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error", message: err.message });
    }
};



module.exports = { getPost,createPostController , createPostWithImage , updatePost, deletePost };
