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
router.post("/login", async (req, res) => {
  try {
    const { clientName, projectTitle } = req.body;

    const client = await Client.findOne({
      where: {
        clientName: clientName,
        projectTitle: projectTitle,
      },
    });

    if (!client) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      message: "Login successful",
      client: {
        id: client.id,
        clientName: client.clientName,
        projectTitle: client.projectTitle,
        projectId: client.projectId,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
});

export default router;
