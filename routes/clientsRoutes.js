// routes/clientRoutes.js
const express = require("express");
const router = express.Router();
const Client = require("../models/Client");

router.post("/register", async (req, res) => {
  const { clientName, projectTitle, email, phone } = req.body;

  try {
    // Generate project ID
    const projectId = `${clientName.substring(0, 2).toUpperCase()}${phone.slice(
      -3
    )}`;

    // Create a new client record
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

module.exports = router;
