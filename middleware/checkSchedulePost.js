import jwt from "jsonwebtoken";

export const checkSchedulePost = async (req, res, next) => {
  try {
    // check for the schedule post

    const { scheduleTime, isSchedulePost } = req.body;
    console.log("check schedule post -> ", req.body);

    if (scheduleTime && isSchedulePost) {
      console.log(scheduleTime, isSchedulePost);
    }

    if (isSchedulePost === "true") {
      const currentTime = new Date();
      const postTime = new Date(scheduleTime);
    }

    next();
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
