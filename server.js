// server.js
import express from "express";
import sequelize from "./database.js";
import cors from "cors";
import contractorRoutes from "./routes/contractorsRoutes.js"; // Updated import name
import clientRoutes from "./routes/clientsRoutes.js";
import Client from "./models/Client.js";
import Contractor from "./models/Contractor.js";

const app = express();
const PORT = 5000;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON data
app.use(express.json());

// Routes
app.use("/api/contractors", contractorRoutes);
app.use("/api/clients", clientRoutes);

// Test database connection and start the server
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");

    // Sync models with database
    await sequelize.sync({ alter: true });
    console.log("Database models synchronized");

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
