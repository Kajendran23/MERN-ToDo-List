const express = require("express");
const mongoose = require("mongoose");
const MongoDb = require("mongodb");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
//DATABASE CONNECTION
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Success MongoDb is Connected!"))
  .catch((err) => console.log("Error :  connection Failed!", err));
app.get("/", (req, res) => {
  res.send("Task Manager Server is Running!");
});
const PORT = process.env.PORT || 5000;
const taskRoutes = require("./routes/taskRoutes");
app.use("/api/tasks", taskRoutes);
app.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}`);
});
