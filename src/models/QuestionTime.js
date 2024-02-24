import Sequelize, { Model } from "sequelize";
import { v4 as uuidv4 } from 'uuid';

class QuestionTime extends Model {
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
        time: Sequelize.INTEGER, // Time in seconds

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
    this.belongsTo(models.Question, { foreignKey: "question_time_id", as: "question_time" });
  }
}

export default QuestionTime;