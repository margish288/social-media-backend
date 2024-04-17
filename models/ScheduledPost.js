import mongoose from "mongoose";

const schedulePostSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: Array,
      default: [],
    },
    scheduleTime: {
      type: Date,
    },
    isSchedulePost: {
      type: Boolean,
    },
    postType: {
      type: String,
      default: "S",
    },
  },
  { timestamps: true }
);

const SchedulePost = mongoose.model("SchedulePost", schedulePostSchema);

export default SchedulePost;
