/**
 * {
"id": "36d5658a-6908-479e-887e-a949ec199272",
"readings": [{
"timestamp": "2021-09-29T16:08:15+01:00",
"count": 2
}, {
"timestamp": "2021-09-29T16:09:15+01:00",
"count": 15
}]
}
● id - a string representing the UUID for the device
● readings - an array of readings for the device
○ timestamp - an ISO-8061 timestamp for when the reading was taken
○ count - an integer representing the reading data

Some considerations:
1. Readings can be sent out of order.
2. There may also be duplicate readings for a given timestamp.
3. Any duplicate readings should be ignored.
4. Readings can be malformed or incomplete.
 */

class DeviceReadings {
  instance;
  readingList = [];
  static getinstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new DeviceReadings();
    return this.instance;
  }
  constructor() {}
  addReadingToList(reading) {
    // Validate first then add to list
    const { id, readings } = reading;
    this.convertedReadingList(id, readings);
  }

  convertedReadingList(id, readings) {
    // Find Id and add Reading if not duplicate timestamp
    let idExist = this.readingList.findIndex((r) => r.id === id);
    if (idExist === -1) {
      this.readingList.push({ id, readings });
    } else {
      let allReadings = [...this.readingList[idExist].readings, ...readings];
      allReadings = [
        ...new Map(
          allReadings.map((obj) => {
            return [`${obj.timestamp}: ${obj.timestamp}`, obj];
          })
        ).values(),
      ];
      this.readingList[idExist].readings = allReadings;
    }
    return JSON.stringify(this.readingList);
  }

  async getReadingForDevice(deviceId) {
    let filteredList = await this.readingList.filter(
      (list) => list.id === deviceId
    );
    return filteredList;
  }
}

const deviceReadingData = DeviceReadings.getinstance();

module.exports = {
  deviceReadingData,
};
