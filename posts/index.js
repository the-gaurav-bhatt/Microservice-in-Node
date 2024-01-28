const express = require("express");
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
app.post("/posts", (req, res) => {
  const id = crypto.randomBytes(4).toString("hex");
  const { title } = req.body;
  const newPost = {
    id,
    title,
  };
  posts.push(newPost);
  console.log(posts);
  return res.status(201).send({ posts });
});

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
