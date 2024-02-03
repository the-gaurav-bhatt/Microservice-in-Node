const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const PORT = 4001;
const crypto = require("crypto");
const posts = [];

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get("/posts", (req, res) => {
//   console.log("hitting post router with id:");
//   return res.status(201).send(posts);
// });

app.post("/posts/create", async (req, res) => {
  try {
    const id = crypto.randomBytes(4).toString("hex");
    const { title } = req.body;
    const newPost = {
      id,
      title,
    };
    posts.push(newPost);
    console.log(posts);
    await axios.post("http://event-bus-srv:4003/event", {
      type: "PostCreated",
      data: newPost,
    });

    return res.status(201).send({ posts });
  } catch (error) {
    console.error("Error in /posts route:", error.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.post("/events", (req, res) => {
  try {
    console.log("An event received from event bus at Post route");
    // Handle the event here if needed
    return res.send({});
  } catch (error) {
    console.error("Error in /events route:", error.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
