import Sequelize, { Model } from "sequelize";
import { v4 as uuidv4 } from 'uuid';

class CorrectAnswer extends Model {
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
        question_id: Sequelize.UUID,
        answer: Sequelize.STRING,
        comment: Sequelize.TEXT,
        image: Sequelize.STRING,
        audio: Sequelize.STRING,
        video: Sequelize.STRING,
        order: Sequelize.INTEGER
      },
      {
        sequelize,
        timestamps: true,
        paranoid: true,
        underscored: true,
      }
    );

    this.sync({ alter: true });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Question, { foreignKey: "question_id", as: "question" });
  }
}

export default CorrectAnswer;