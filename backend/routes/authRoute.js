const express = require("express");
const {
  registerUser,
  loginUser,
  getuserProfile,
} = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");
const cloudinary = require("../config/cloudinaryConfig");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getuserProfile);

router.post("/upload-image", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file Uploaded" });
  }

  const imageUrl = await cloudinary.uploader.upload(req.file.path);

console.log(imageUrl);

  res.status(200).json({ imageUrl: imageUrl.secure_url });
});

module.exports = router;
