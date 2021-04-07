import express from "express";
import { getPosts } from "../controllers/post.controller";
const app = express();

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

app.get('/api/posts', [], getPosts);

export default app;