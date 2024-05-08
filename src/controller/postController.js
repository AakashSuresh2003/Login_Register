const Post = require("../models/postModel");
const User = require("../models/userModel");


const createPostController = async (req, res) => {
  try {
    const userId = req.user.id;
    const { caption } = req.body;
    if (!userId) throw new Error("User not found");
    
    // Create new post
    const newPost = new Post({
        user: userId,
        caption
    });
    await newPost.save();

    // Associate the post with the user
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


module.exports = { createPostController , createPostWithImage };
