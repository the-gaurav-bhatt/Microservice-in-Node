const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
const PORT = 4000;
const crypto = require("crypto");
const commentByPostId = {};

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/posts/:id/comments", (req, res) => {
  try {
    const id = req.params.id;
    console.log("hitting get comment router with id:", id);

    if (!commentByPostId[id]) {
      console.log("No comments found");
      return res.status(404).send({ error: "No comments found for this post" });
    } else {
      return res.status(201).send(commentByPostId[id]);
    }
  } catch (error) {
    console.error("Error in GET /posts/:id/comments route:", error.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.post("/posts/:id/comments", async (req, res) => {
  try {
    const id = req.params.id;
    console.log("hitting create comment router with id:", id);
    const commentId = crypto.randomBytes(4).toString("hex");
    const { content } = req.body;
    console.log("Comment content received at backend", content);

    const comments = commentByPostId[id] || [];
    comments.push({ id: commentId, content });
    commentByPostId[id] = comments;

    // giving it to event-bus in case anyone else needs it
    await axios.post("http://event-bus-srv:4003/event", {
      type: "CommentCreated",
      data: { id: commentId, content, postId: id, status: "pending" },
    });

    return res.status(201).send(comments);
  } catch (error) {
    console.error("Error in POST /posts/:id/comments route:", error.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.post("/events", (req, res) => {
  try {
    console.log("An event received from the event bus at the comment route");
    res.send({});
  } catch (error) {
    console.error("Error in POST /events route:", error.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
