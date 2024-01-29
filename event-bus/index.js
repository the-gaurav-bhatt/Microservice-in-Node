const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const PORT = 4003;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/event", async (req, res) => {
  const event = req.body;
  await axios.post("http://localhost:4000/events", event);
  await axios.post("http://localhost:4001/events", event);
  await axios.post("http://localhost:4002/events", event);
  return res.send({ status: "Ok" });
});

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
