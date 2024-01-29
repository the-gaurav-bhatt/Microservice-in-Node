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
app.get("/posts", (req, res) => {
  console.log("hitting post router with id:");
  return res.status(201).send(posts);
});
app.post("/posts", async (req, res) => {
  const id = crypto.randomBytes(4).toString("hex");
  const { title } = req.body;
  const newPost = {
    id,
    title,
  };
  posts.push(newPost);
  console.log(posts);
  await axios.post("http://localhost:4003/event", {
    type: "PostCreated",
    data: newPost,
  });

  return res.status(201).send({ posts });
});
app.post("/events", (req, res) => {
  console.log("An event received from event bus at Post route");
  return res.send({});
});
app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
