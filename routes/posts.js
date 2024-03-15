const express = require("express");


const PostController = require("../backend/controllers/posts")
const checkAuth = require("../backend/middleware/check-auth");
const extractFile = require("../backend/middleware/file");

const router = express.Router();


router.post(
  "",
  checkAuth,
  extractFile, 
  PostController.createPost
);

router.put(
  "/:id",
  checkAuth,
  extractFile,
  PostController.updatePost
);

router.get("",PostController.getPosts);

router.get("/:id",PostController.getPost);

router.delete("/:id", checkAuth,PostController.deletePost );

module.exports = router;
