import mongoose from "mongoose";
const jobSchema = mongoose.Schema({
  title: String,
  description: String,
  category: Number,
  deadline: String,
});
const Job = mongoose.model("Jobs", jobSchema);
export default Job;
