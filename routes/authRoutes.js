import express from "express";
import Contractor from "../models/Contractor.js"; // Correct relative path

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
      contractorName: contractor.contractorName,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Error during login" });
  }
});

export default router;
