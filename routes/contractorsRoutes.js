// contractorRoutes.js (renamed from authRoutes.js)
import express from "express";
import Contractor from "../models/Contractor.js";

const router = express.Router();

// Contractor Login Route
router.post("/login", async (req, res) => {
  const { contractorName, contractorId } = req.body;

  try {
    // Check if contractor exists
    const contractor = await Contractor.findOne({
      where: { contractorName, contractorId },
    });

    if (!contractor) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    // Authentication successful
    res.status(200).json({
      message: "Login successful",
      contractor: {
        id: contractor.id,
        contractorName: contractor.contractorName,
        contractorId: contractor.contractorId,
        email: contractor.email,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Error during login" });
  }
});

// Contractor Registration Route (moved from server.js)
router.post("/register", async (req, res) => {
  try {
    const { contractorName, contractorId, email, phone } = req.body;
    const newContractor = await Contractor.create({
      contractorName,
      contractorId,
      email,
      phone,
    });
    res.status(201).json({
      message: "Contractor registered successfully",
      contractor: newContractor,
    });
  } catch (error) {
    console.error("Error registering contractor:", error);
    res.status(500).json({ message: "Error registering contractor" });
  }
});

export default router;
