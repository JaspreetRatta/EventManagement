const router = require("express").Router();

const Worker = require("../models/wokersModel");
const authMiddleware = require("../middlewares/authMiddleware");

// add-worker
router.post("/add-worker", authMiddleware, async (req, res) => {
  try {
    const existingWorker = await Worker.findOne({ workerEmail: req.body.workerEmail });
    if (existingWorker) {
      return res.status(200).send({
        success: false,
        message: "Worker already exists",
      });
    }
    const newWorker = new Worker(req.body);
    await newWorker.save();
    return res.status(200).send({
      success: true,
      message: "Worker added successfully",
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

// update-worker
router.post("/update-worker", authMiddleware, async (req, res) => {
  try {
    await Worker.findByIdAndUpdate(req.body._id, req.body);
    return res.status(200).send({
      success: true,
      message: "Worker updated successfully",
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

// delete-worker
router.post("/delete-worker", authMiddleware, async (req, res) => {
  try {
    await Worker.findByIdAndDelete(req.body._id);
    return res.status(200).send({
      success: true,
      message: "Worker deleted successfully",
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

// get-all-workers
router.post("/get-all-workers", authMiddleware, async (req, res) => {
  try {
    const workers = await Worker.find(req.body);
    return res.status(200).send({
      success: true,
      message: "Workers fetched successfully",
      data: workers,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

// get-worker-by-id
router.post("/get-worker-by-id", authMiddleware, async (req, res) => {
  try {
    const worker = await Worker.findById(req.body._id);
    return res.status(200).send({
      success: true,
      message: "Worker fetched successfully",
      data: worker,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

// list-workers (limited to 3, similar to your example)
router.post("/list-workers", authMiddleware, async (req, res) => {
  try {
    const workers = await Worker.find().sort({ _id: -1 }).limit(3);
    res.send({
      success: true,
      message: "Workers listed successfully",
      data: workers,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

module.exports = router;
