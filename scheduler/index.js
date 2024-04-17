import runPostScheduler from "../scheduler/runPostScheduler";

const timeInterval = 60000;
setInterval(runPostScheduler, timeInterval);
