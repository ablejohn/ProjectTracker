// app.js
const express = require("express");
const clientRoutes = require("./routes/clientRoutes");
const contractorRoutes = require("./routes/contractorRoutes");
const app = express();

app.use(express.json());
app.use("/api/clients", clientRoutes);
app.use("/api/contractors", contractorRoutes);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
