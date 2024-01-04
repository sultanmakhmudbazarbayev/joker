import { Sequelize } from "sequelize";
import databaseConfig from "~/src/config/database";
import { getFiles, syncModels } from "~/src/utils";

const modelPath = "../models/";
const modelFiles = getFiles(`/${modelPath}`);

const sequelizeService = {
  init: async () => {
    try {
      let connection = new Sequelize(databaseConfig);

      /*
        Loading models automatically
      */

      for (const file of modelFiles) {
        const model = await import(`${modelPath}${file}`);
        model.default.init(connection);
      }

      modelFiles.map(async (file) => {
        const model = await import(`${modelPath}${file}`);
        model.default.associate && model.default.associate(connection.models);
      });

      await syncModels();

      console.log("[SEQUELIZE] Database service initialized");
    } catch (error) {
      console.log("[SEQUELIZE] Error during database service initialization");
      throw error;
    }
  },
};

export default sequelizeService;
