const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const PORT = 4004;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function isWordPresent(word, content) {
  var words = content.toLowerCase().split(/\s+/);
  return words.includes(word);
}

app.post("/events", async (req, res) => {
  try {
    console.log("Event Received at Moderation Service from Event bus Maybe");
    const { type, data } = req.body;
    const { id, content, postId, status } = data;

    if (type === "CommentCreated") {
      const isRejected = isWordPresent("fuck", content);

      if (isRejected) {
        data["status"] = "rejected";
      } else {
        data["status"] = "approved";
      }

      console.log(data);

      // Simulating an asynchronous operation with setTimeout
      setTimeout(async () => {
        await axios.post("http://event-bus-srv:4003/event", {
          type: "CommentModerated",
          data,
        });
      }, 3000);
    }

    return res.send({});
  } catch (error) {
    console.error("Error in /events route:", error.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
