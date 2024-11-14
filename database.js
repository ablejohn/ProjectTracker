// database.js
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "project_tracker",
  "project_user",
  "password123",
  {
    host: "localhost",
    dialect: "postgres",
    logging: false,
  }
);

export default sequelize;
