// routes/messagesRoutes.js
import express from "express";
import upload from "../utils/fileUpload.js";
import Message from "../models/Message.js";
import Client from "../models/Client.js";
import Contractor from "../models/Contractor.js";

const router = express.Router();

// Get messages between two parties
router.get("/:senderId/:receiverId", async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;

    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          {
            senderId: senderId,
            receiverId: receiverId,
          },
          {
            senderId: receiverId,
            receiverId: senderId,
          },
        ],
      },
      order: [["createdAt", "ASC"]],
      include: [
        {
          model: Client,
          as: "senderClient",
          attributes: ["clientName"],
        },
        {
          model: Contractor,
          as: "senderContractor",
          attributes: ["contractorName"],
        },
      ],
    });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Send a message
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const { senderId, senderType, receiverId, receiverType, text } = req.body;

    const messageData = {
      senderId,
      senderType,
      receiverId,
      receiverType,
      text,
    };

    // Handle file upload if exists
    if (req.file) {
      messageData.fileUrl = `/uploads/${req.file.filename}`;
      messageData.fileName = req.file.originalname;
      messageData.fileSize = req.file.size;
      messageData.fileType = req.file.mimetype;
    }

    const message = await Message.create(messageData);

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
