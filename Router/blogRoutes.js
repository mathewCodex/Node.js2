const express = require("express");
const blogController = require("../mvc/blogController");
const router = express.Router();

//blogs routes..
router.get("/", blogController.blog_index);

/////
router.post("/", blogController.blog_create_post);

//creating a post request..
router.get("/create", blogController.blog_create_get);

//geting id:,
router.get("/:id", blogController.blog_details);

//creating an handler for delete request..
router.delete("/:id", blogController.blog_delete);

module.exports = router;
