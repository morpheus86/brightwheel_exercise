const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const PORT = process.env.PORT || 3000;
const apiRoutes = require("./routes/api");
const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Origin", "GET, POST");
  next();
});
// Wiring of the routers (Rest API Calls)
app.use("/api", apiRoutes);
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong.";
  res.status(status).json({
    message,
  });
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
