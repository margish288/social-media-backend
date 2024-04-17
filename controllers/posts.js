import Post from "../models/Post.js";
import User from "../models/User.js";
import SchedulePost from "../models/ScheduledPost.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    console.log("create post Request ni body -> ", req.body);
    const { userId, description, picturePath, scheduleTime, isSchedulePost } =
      req.body;
    const user = await User.findById(userId);

    if (isSchedulePost === "true") {
      const schedulePostEntry = new SchedulePost({
        userId,
        firstName: user.firstName,
        lastName: user.lastName,
        location: user.location,
        description,
        userPicturePath: user.picturePath,
        picturePath,
        likes: {},
        comments: [],
        scheduleTime,
        isSchedulePost,
        postType: "S",
      });

      // Schedule post data
      await schedulePostEntry.save();

      const post = await Post.find();
      console.log("returning from schedule post");
      res.status(201).json(post);
    } else {
      const newPost = new Post({
        userId,
        firstName: user.firstName,
        lastName: user.lastName,
        location: user.location,
        description,
        userPicturePath: user.picturePath,
        picturePath,
        likes: {},
        comments: [],
        postType: "D",
      });
      await newPost.save();

      const post = await Post.find();
      console.log("returning from non-schedule post");
      res.status(201).json(post);
    }
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: Object.fromEntries(post.likes.entries()) },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
