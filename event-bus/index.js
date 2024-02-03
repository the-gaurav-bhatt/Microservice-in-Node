const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const PORT = 4003;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/event", async (req, res) => {
  try {
    const event = req.body;
    console.log(event);
    await axios.post("http://comments-ip-srv:4000/events", event);
    await axios.post("http://post-ip-srv:4001/events", event);
    await axios.post("http://query-ip-srv:4002/events", event);
    await axios.post("http://moderation-ip-srv:4004/events", event);

    return res.send({ status: "Ok" });
  } catch (error) {
    console.error("Error in /event route:", error.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log("Listening in event-bus....");
  console.log("Listening on port " + PORT);
});
