import ImageKit from "imagekit";
import postModel from "../models/post.model.js";
import userModel from "../models/user.model.js";

class Post {
  //  ALL POSTS
  async getPosts(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 2;

      const query = {};

      const { cat, author, search, sort ,featured} = req.query;
      console.log(featured);
      

      if (cat) {
        query.category = cat;
      }

      if (search) {
        query.title = { $regex: search, $options: "i" };
      }

      if (author) {
        const user = await userModel
          .findOne({ username: author })
          .select("_id");
        if (!user) {
          return res.status(404).json("No Post Found");
        }
        query.user = user._id;
      }

      let sortObj = { createdAt: -1 };

      if (sort) {
        console.log(sort);

        switch (sort) {
          case "newest":
            sortObj = { createdAt: -1 };

            break;
          case "oldest":
            sortObj = { createdAt: 1 };
            break;
          case "popular":
            sortObj = { visit: -1 };
            break;
          case "trending":
            sortObj = { visit: -1 };
            query.createdAt = {
              $gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
            };
            break;
          default:
            break;
        }
      }

      if(featured){
        query.isFeatured = true;
      }

      const allPosts = await postModel
        .find(query)
        .populate("user", "fullName")
        .sort(sortObj)
        .limit(limit)
        .skip((page - 1) * limit);

      const totalPosts = await postModel.countDocuments(); // Count with applied query
      const hasMore = page * limit < totalPosts;

      res.status(200).json({ allPosts, hasMore });
    } catch (error) {
      res.status(500).json({ message: "An error occurred", error });
    }
  }

  //  SINGLE POST
  async getPost(req, res) {
    const singlePost = await postModel
      .findOne({ slug: req.params.slug })
      .populate("user", "username fullName");
    res.status(200).json(singlePost);
  }

  //  CREATE POST
  async createPost(req, res) {
    try {
      const clerkUserId = req?.auth?.userId;
      // console.log("ReqAuth=============>>>",req.auth);

      // console.log("ClerkID",clerkUserId);

      // console.log(req.headers);

      if (!clerkUserId) {
        return res.status(401).json("Not authenticated!");
      }

      const user = await userModel.findOne({ clerkUserId });

      if (!user) {
        return res.status(404).json("User not found!");
      }

      //  SLUG LOGIC

      let slug = req.body.title.replace(/ /g, "-").toLowerCase();
      let existSlug = await postModel.findOne({ slug });
      let counter = 2;

      while (existSlug) {
        slug = `${slug}-${counter}`;
        existSlug = await postModel.findOne({ slug });
        counter++;
      }

      const newPost = new postModel({
        ...req.body,
        user: user._id,
        slug,
      });

      const post = await newPost.save();
      res.status(200).json({
        message: "Post created",
        post: post,
      });
    } catch (error) {
      console.log(error);
    }
  }

  //  DELETE POST
  async deletePost(req, res) {
    const clerkUserId = req.auth.userId;
    const postId = req.params.id;
    if (!clerkUserId) {
      return res.status(401).json("Not authenticated!");
    }
    const role = (await userModel.findOne({ role: "admin" })) || "user";
    if (role) {
      await postModel.findByIdAndDelete(postId);
      return res.status(200).json({
        message: "Post deleted",
        post: deletePost,
      });
    }

    const user = await userModel.findOne({ clerkUserId });
    const deletePost = await postModel.findOneAndDelete({
      _id: postId,
      user: user._id,
    });
    if (!deletePost) {
      return res.status(403).json("You can delete only your Post");
    }
    res.status(200).json({
      message: "Post deleted",
      post: deletePost,
    });
  }

  //  UPLOAD AUTH

  async uploadAuth(req, res) {
    try {
      const imagekit = new ImageKit({
        urlEndpoint: process.env.IK_URL_ENDPOINT,
        publicKey: process.env.IK_PUBLIC_KEY,
        privateKey: process.env.IK_PRIVATE_KEY,
      });
      const result = imagekit.getAuthenticationParameters();
      res.status(200).send(result);
    } catch (error) {
      res.status(500).json({
        message: "Error uploading Auth",
        error: error.message,
      });
    }
  }

  //  FEATURE
  async featurePost(req, res) {
    try {
      const clerkUserId = req.auth.userId;
  const postId = req.body.postId;

  if (!clerkUserId) {
    return res.status(401).json("Not authenticated!");
  }

  const role = await userModel.findOne({clerkUserId}) || "user";

  if (role !== "admin") {
    return res.status(403).json("You cannot feature posts!");
  }

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json("Post not found!");
  }

  const isFeatured = post.isFeatured;

  const updatedPost = await postModel.findByIdAndUpdate(
    postId,
    {
      isFeatured: !isFeatured,
    },
    { new: true }
  );

  res.status(200).json(updatedPost);
    } catch (error) {
      res.status(500).json({
        message: "Error uploading Auth",
        error: error.message,
      });
    }
  }


}

const postController = new Post();

export default postController;
