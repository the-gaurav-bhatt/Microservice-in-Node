const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 4000;
const crypto = require("crypto");
const commentByPostId = {};
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.get("/posts/:id/comments", (req, res) => {
  const id = req.params.id;
  console.log("hitting get comment router with id:", id);
  if (!commentByPostId[id]) {
    console.log("No comments found");
    return res.status(404).send({ error: "No comments found for this post" });
  } else return res.status(201).send(commentByPostId[id]);
});
app.post("/posts/:id/comments", (req, res) => {
  const id = req.params.id;
  console.log("hitting create comment router with id:", id);
  const commentId = crypto.randomBytes(4).toString("hex");
  const { content } = req.body;
  const comments = commentByPostId[id] || [];
  comments.push({ id: commentId, content });
  commentByPostId[id] = comments;
  return res.status(201).send(comments);
});
app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
