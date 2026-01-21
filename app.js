const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const fileUpload = require("express-fileupload");
const cors = require("cors");

// Load environment variables from .env file
//require("dotenv").config({ path: path.join(__dirname, ".env") });

const app = express();

app.set("trust proxy", 1); // Trust first proxy

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  //process.env.CUSTOM_ORIGIN,
  //process.env.ANOTHER_ORIGIN,
].filter(Boolean);

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    if (
      process.env.NODE_ENV === "development" &&
      origin.startsWith("http://localhost:")
    ) {
      return callback(null, true);
    }
    // Reject other origins
    const messsage =
      "The CORS policy for this site does not allow access from the specified Origin.";
    return callback(new Error(messsage), false);
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(fileUpload());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/products", require("./routes/api"));
// // 404 handler
// app.use("*", (req, res) => {
//   res.status(404).json({
//     error: "Not Found",
//     requestId: req.reID,
//   });
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}✅`);
});
