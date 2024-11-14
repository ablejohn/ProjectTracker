// index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const clientRoutes = require("./routes/clients");
const contractorRoutes = require("./routes/contractors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/yourDatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/api/clients", clientRoutes);
app.use("/api/contractors", contractorRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
