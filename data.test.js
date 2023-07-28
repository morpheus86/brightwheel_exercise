const { deviceReadingData } = require("./data/index");

const { addReadingToList, getReadingForDevice, readingList } =
  deviceReadingData;
describe("reading list device tests", () => {
  test("reading list to be empty", () => {
    expect(readingList).toStrictEqual([]);
  });
  test("functions of class", () => {
    expect(typeof addReadingToList).toBe("function");
    expect(typeof getReadingForDevice).toBe("function");
  });
});
