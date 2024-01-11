import Sequelize, { Model } from "sequelize";
import { v4 as uuidv4 } from 'uuid';

class Quiz extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.TEXT,
          defaultValue: () => uuidv4(),
          primaryKey: true,
          allowNull: false,
          unique: true,
        },
        name: Sequelize.TEXT,
        image: Sequelize.TEXT,
      },
      {
        sequelize,
        timestamps: true,
        paranoid: true,
        underscored: true,
      }
    );

    // this.sync({ alter: true });
    return this;
  }

  static associate(models) {
    this.hasMany(models.Question, { foreignKey: "quiz_id", as: "questions" });
    this.hasMany(models.Round, { foreignKey: "quiz_id", as: "rounds" });

  }
}

export default Quiz;