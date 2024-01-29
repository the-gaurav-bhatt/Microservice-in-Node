const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4002;
const posts = [];
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/posts", (req, res) => {
  console.log("Sending posts", posts);
  return res.status(200).send({ posts });
});
app.post("/events", (req, res) => {
  console.log("Evenet Received at Query Service from Event bus Maybe");
  const { type, data } = req.body;
  console.log(type, data);
  if (type === "PostCreated") {
    const { id, title } = data;
    posts.push({ id, title, comments: [] });
  }
  if (type === "CommentCreated") {
    const { id, content, postId } = data;
    const post = posts.find((post) => post.id === postId);
    if (post) {
      post.comments.push({ id, content });
    }
  }
  console.log(posts);
  return res.status(200).send({ hi: "Bro HI" });
});

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
