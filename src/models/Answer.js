import Sequelize, { Model } from "sequelize";
import { v4 as uuidv4 } from 'uuid';

class Answer extends Model {
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
        answer: Sequelize.JSONB
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
    this.belongsTo(models.Question, { foreignKey: "question_id", as: "question" });
    this.belongsTo(models.Team, { foreignKey: "team_id", as: "team" });
  }
}

export default Answer;