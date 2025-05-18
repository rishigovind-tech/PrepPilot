require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes=require("./routes/authRoute")

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

connectDB();

app.use(express.json());

app.use("/api/auth", authRoutes);
// app.use("/api/session", sessionRoutes);
// app.use("/api/question", questionRoutes);

// app.use("/api/ai/generate-questions", protect, generateInterviewQuestion);
// app.use("/api/ai/generate-explaination", protect, generateConceptExplaination);

app.use("/uploads", express.static(path.join(__dirname, "uploads"), {}));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
