// syncDatabase.js
import sequelize from "./database.js";
import Client from "./models/Client.js";
import Contractor from "./models/Contractor.js";

async function syncDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    await Client.sync({ alter: true });
    await Contractor.sync({ alter: true });
    console.log("Models synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  } finally {
    await sequelize.close();
  }
}

syncDatabase();
