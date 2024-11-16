// clientRoutes.js
import express from "express";
import Client from "../models/Client.js";

const router = express.Router();

// Registration route
router.post("/register", async (req, res) => {
  const { clientName, projectTitle, email, phone } = req.body;

  try {
    const projectId = `${clientName.substring(0, 2).toUpperCase()}${phone.slice(
      -3
    )}`;

    const client = await Client.create({
      clientName,
      projectTitle,
      email,
      phone,
      projectId,
    });

    res.status(201).json({
      message: "Client registered successfully",
      projectId: client.projectId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error registering client" });
  }
});

// Login route
// In clientRoutes.js, update the login route:
router.post("/login", async (req, res) => {
  try {
    const { email, projectId } = req.body;
    console.log("Login attempt with:", { email, projectId });

    const client = await Client.findOne({
      where: {
        email: email,
        projectId: projectId,
      },
    });

    console.log("Database query result:", client);

    if (!client) {
      console.log("No client found with these credentials");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log("Client found, sending success response");
    res.status(200).json({
      message: "Login successful",
      client: {
        id: client.id,
        clientName: client.clientName,
        email: client.email,
        projectId: client.projectId,
        projectTitle: client.projectTitle,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
});

//route for contractor to get list of registered clients
router.get("/", async (req, res) => {
  try {
    const clients = await Client.findAll({
      attributes: ["id", "clientName", "projectTitle", "projectId", "email"], // Specify which fields to return
      order: [["createdAt", "DESC"]], // Optional: Sort by newest first
    });
    res.json(clients);
  } catch (error) {
    console.error("Error fetching clients:", error);
    res.status(500).json({ message: "Error fetching clients" });
  }
});

export default router;
