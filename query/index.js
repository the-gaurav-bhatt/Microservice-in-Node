const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4002;
const posts = [];

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/posts", (req, res) => {
  try {
    console.log("Sending posts", posts);
    return res.status(200).send({ posts });
  } catch (error) {
    console.error("Error in GET /posts route:", error.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.post("/events", (req, res) => {
  try {
    console.log("Event Received at Query Service from Event bus Maybe");
    const { type, data } = req.body;
    console.log(type, data);

    if (type === "PostCreated") {
      const { id, title } = data;
      posts.push({ id, title, comments: [] });
    }

    if (type === "CommentCreated") {
      const { id, content, postId, status } = data;
      const post = posts.find((post) => post.id === postId);

      if (post) {
        post.comments.push({ id, content, status });
      }
    }

    if (type === "CommentModerated") {
      const { id, content, postId, status } = data;
      const post = posts.find((post) => post.id === postId);

      if (post) {
        const comment = post.comments.find((comment) => comment.id === id);

        if (comment) {
          comment.status = status;
          console.log("Comment Status modified inside Query");
        }
      }
    }

    console.log(posts);
    return res.status(200).send({ hi: "Bro HI" });
  } catch (error) {
    console.error("Error in POST /events route:", error.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
