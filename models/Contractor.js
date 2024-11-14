// models/Contractor.js
import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Contractor = sequelize.define("Contractor", {
  contractorName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contractorId: {
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
});

export default Contractor;
