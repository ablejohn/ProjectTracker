import express from "express";
import sequelize from "./database.js";
import cors from "cors";
import contractorAuthRoutes from "./routes/authRoutes.js";
import Client from "./models/Client.js";
import Contractor from "./models/Contractor.js";

const app = express();
const PORT = 5000;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON data
app.use(express.json());

// Contractor Authentication Routes
app.use("/api/contractors", contractorAuthRoutes);

// Client Registration Route
app.post("/api/clients/register", async (req, res) => {
  try {
    const { clientName, projectTitle, email, phone, projectId } = req.body;
    const newClient = await Client.create({
      clientName,
      projectTitle,
      email,
      phone,
      projectId,
    });
    res.status(201).json(newClient);
  } catch (error) {
    console.error("Error registering client:", error);
    res.status(500).json({ message: "Error registering client" });
  }
});

// Contractor Registration Route
app.post("/api/contractors/register", async (req, res) => {
  try {
    const { contractorName, contractorId, email, phone } = req.body;
    const newContractor = await Contractor.create({
      contractorName,
      contractorId,
      email,
      phone,
    });
    res.status(201).json(newContractor);
  } catch (error) {
    console.error("Error registering contractor:", error);
    res.status(500).json({ message: "Error registering contractor" });
  }
});

// Test database connection and start the server
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
