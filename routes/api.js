const express = require("express");
const { validateReadingData } = require("../utils/validations");
const { deviceReadingData } = require("../data/index");
const router = express.Router();

// router to list reading for single device
router.get("/:deviceId", async (req, res, next) => {
  try {
    const { deviceId } = req.params;
    const deviceReading = await deviceReadingData.getReadingForDevice(deviceId);
    if (deviceReading.length > 0) {
      res.json(deviceReading[0].readings);
    } else {
      res.json([]);
    }
  } catch (error) {
    console.log("error :>> ", error);
  }
});

// router to post reading to a single device
router.post("/new_readings", async (req, res, next) => {
  const data = req.body;
  const isDataValidated = validateReadingData(data);
  if (isDataValidated.message) {
    return res.status(422).json({
      message: isDataValidated.message,
      errors: isDataValidated.message,
    });
  }

  try {
    const addingListtoDevice = await deviceReadingData.addReadingToList(
      req.body
    );
    res.status(201).json({
      message: "New reading added",
    });
  } catch (error) {
    console.log("error :>> ", error);
  }
});

module.exports = router;
