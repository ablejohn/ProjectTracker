// routes/contractorRoutes.js
const express = require("express");
const router = express.Router();
const Contractor = require("../models/Contractor");

router.post("/register", async (req, res) => {
  const { contractorName, contractorId, email, phone } = req.body;

  try {
    // Create a new contractor record
    const contractor = await Contractor.create({
      contractorName,
      contractorId,
      email,
      phone,
    });

    res.status(201).json({ message: "Contractor registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error registering contractor" });
  }
});

module.exports = router;
