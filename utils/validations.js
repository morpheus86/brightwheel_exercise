// Validation of id, radings, lists, counts and duplicate
const validateReadingData = (data) => {
  const error = {};
  if (!data.id) {
    error.message = "No id exist";
  }
  // Validate readings
  const readings = data.readings;
  if (!readings.length) {
    error.message = "No reading available";
  }
  for (reading of readings) {
    // let's fix the malform reading for count and timestamp
    /* We can have a lot of different approach, but I am gonna keep it simple and I will just add it to the error object and return the appropriate message
     */
    if (!reading.count || !reading.timestamp) {
      error.id = data.id;
      if (!reading.count) {
        error.message = `Count is empty or not a Number at this device number ${data.id}`;
        break;
      }
      if (!reading.timestamp) {
        error.message = "Timestamp is empty";
        break;
      }
    }
    if (new Date(reading.timestamp) > new Date()) {
      error.message = "Timestamp is incorrect";
    }
  }
  return error;
};
module.exports = {
  validateReadingData,
};
