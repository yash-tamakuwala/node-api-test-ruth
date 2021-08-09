const express = require('express');
const router = express();
const postController = require("../api/post");
const userController = require("../api/user");
const validationMiddleware = require('../middleware/validation-middleware');

router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: ":)",
    })
});

router.post("/signup", validationMiddleware.signup, userController.signup);
router.post("/createpost", validationMiddleware.createpost, postController.createpost)
router.post("/editpost", validationMiddleware.editpost, postController.editpost)
router.post("/deletepost", validationMiddleware.deletepost, postController.deletepost)
router.post("/ratingpost", validationMiddleware.ratingpost, postController.ratingpost)
router.get("/getallpost", postController.getallpost)


module.exports = router;
