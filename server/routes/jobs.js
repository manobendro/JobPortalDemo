import { Router } from "express";
import auth from "../middleware/auth.js";
import Joi from "joi";
import Job from "../model/job.js";

const jobRoute = Router();
jobRoute.use(auth);

jobRoute.get("/", async (req, res) => {
  let start = req.query.start;
  let end = req.query.end;

  const total_job = await Job.countDocuments({});

  if (!start) {
    start = 0;
  }
  if (!end) {
    end = total_job;
  }
  if (start < 0 || isNaN(Number(start)) || end < 0 || isNaN(Number(end))) {
    start = 0;
    end = total_job;
  }
  //console.log(`Start ${start} and End ${end}`);

  const jobs = await Job.find({})
    .skip(start)
    .limit(end - start);
  if (jobs) {
    return res.send({ total_job, jobs });
  }
  return res.status(404).send({ msg: "No Job Post found." });
});
jobRoute.post("/", async (req, res) => {
  const jobData = req.body;
  const { error } = validateJob(jobData);
  if (error) {
    return res.status(400).send({ msg: "Invalid job information." });
  }
  const job = new Job({
    title: jobData.title,
    description: jobData.description,
    category: jobData.category,
    deadline: jobData.deadline,
  });
  const saveJob = await job.save();
  if (saveJob) {
    return res.send({ id: saveJob._id, msg: "Job added." });
  }
});
jobRoute.put("/:id", async (req, res) => {
  const jobId = req.params.id;
  const updateValue = req.body;
  if (!isValidId(jobId)) {
    return res.status(400).send({ msg: "Invalid request!" });
  }
  const deletedJob = await Job.findByIdAndUpdate(
    jobId,
    { $set: { ...updateValue } },
    { new: true }
  );
  if (deletedJob) {
    return res.send({ msg: "Job post updated.", job: deletedJob });
  }
  return res.status(404).send({ msg: "Job not found." });
});
jobRoute.delete("/:id", async (req, res) => {
  const jobId = req.params.id;
  if (!isValidId(jobId)) {
    return res.status(400).send({ msg: "Invalid request!" });
  }
  const deletedJob = await Job.findByIdAndDelete(jobId);
  if (deletedJob) {
    return res.send({ msg: "Successfully job post deleted.", job: deletedJob });
  }
  return res.status(404).send({ msg: "Job not found." });
});

function validateJob(jobData) {
  const schema = Joi.object({
    title: Joi.string().min(10),
    description: Joi.string().min(50),
    category: Joi.number().positive().greater(0).less(10),
    deadline: Joi.string().min(10),
  });
  return schema.validate(jobData);
}
function isValidId(id) {
  const hexPattern = /^[0-9a-fA-F]{24}$/;
  return hexPattern.test(id);
}

export default jobRoute;
