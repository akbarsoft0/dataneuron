require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

const UserModel = require("./models/Users");

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3002;
const URI = process.env.MONGODB_URI;
app.get("/", (req, res) => res.send("server is running"));

// MongoDB setup
// mongoose.connect("mongodb://127.0.0.1:27017/DataNeuron", {
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Add data
app.post("/add", async (req, res) => {
  try {
    console.log(req.body);
    const { name, age, email } = req.body;
    if (!name || !age || !email) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newData = new UserModel({ name, age, email });
    await newData.save();
    res.json({ message: "Data added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Update data
app.put("/update/:id", async (req, res) => {
  try {
    const { name, age, email } = req.body;
    const data = await UserModel.findByIdAndUpdate(
      req.params.id,
      { name, age, email },
      { new: true }
    );
    if (!data) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.json({ message: "Data updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Delete data
app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const data = await UserModel.deleteOne({ _id: id });
    if (data) {
      res.json({ message: "Data deleted successfully" });
    } else {
      return res.status(404).json({ error: "Data not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});
// Get all data API
app.get("/data", async (req, res) => {
  try {
    const allUsers = await UserModel.find({});
    res.json({ status: "ok", data: allUsers });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Count API
app.get("/count", async (req, res) => {
  try {
    const totalCount = await UserModel.countDocuments({});
    res.json(totalCount);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
