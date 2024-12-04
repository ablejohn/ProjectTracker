// models/Message.js
import { DataTypes } from "sequelize";
import sequelize from "../database.js";
import Client from "./Client.js";
import Contractor from "./Contractor.js";

const Message = sequelize.define(
  "Message",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    senderId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    senderType: {
      type: DataTypes.ENUM("client", "contractor"),
      allowNull: false,
    },
    receiverId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    receiverType: {
      type: DataTypes.ENUM("client", "contractor"),
      allowNull: false,
    },
    fileUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fileName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fileSize: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    fileType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "messages",
    timestamps: true,
  }
);

// Associations
Message.belongsTo(Client, {
  foreignKey: "senderId",
  constraints: false,
  as: "senderClient",
});

Message.belongsTo(Contractor, {
  foreignKey: "senderId",
  constraints: false,
  as: "senderContractor",
});

export default Message;
