// models/Client.js
import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Client = sequelize.define("Client", {
  clientName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  projectTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  projectId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Client;
