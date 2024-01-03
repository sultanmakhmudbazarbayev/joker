import { Sequelize } from "sequelize";
import dbConfig from "./config/config.js";

const sequelize = new Sequelize(dbConfig);

export default sequelize;