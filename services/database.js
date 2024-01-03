import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '/home/sulacy/Desktop/joker-quiz/mock.db'
  });