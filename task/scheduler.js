import Post from "../models/Post.js";
import ScheduledPost from "../models/ScheduledPost.js";

const scheduler = async () => {
  console.log("running scheduler...");
  const currentMinute = new Date().getMinutes();
  const postToSchedule = await ScheduledPost.find({
    scheduleTime: {
      $lte: new Date(),
      $gt: new Date(new Date().setMinutes(currentMinute - 1)),
    },
  });
  console.log("posts picked from scheduled post->", postToSchedule.length);

  postToSchedule.forEach(async (scheduledPost) => {
    console.log(`Publishing scheduled post: ${postToSchedule}`);
    const _id = scheduledPost._id;
    const post = {
      ...scheduledPost,
      postType: "D",
    };

    console.log(post);
    delete post._id;
    delete post.isSchedulePost;
    delete post.scheduleTime;

    const newPost = new Post(post);
    await newPost.save();
    console.log("schedulepost to remove", scheduledPost._id);
    await ScheduledPost.findByIdAndRemove(_id);
  });
};

export default scheduler;
