const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const PORT = 4004;
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
function isWordPresent(word, content) {
  // Convert the sentence to lowercase and split it into an array of words
  var words = content.toLowerCase().split(/\s+/);

  // Check if the word "fuck" exists in the array of words
  return words.includes(word);
}
app.post("/events", async (req, res) => {
  console.log("Evenet Received at Moderation Service from Event bus Maybe");
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
    setTimeout(async () => {
      await axios.post("http://localhost:4003/event", {
        type: "CommentModerated",
        data,
      });
    }, 3000);
  }

  return res.send({});
});
app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
