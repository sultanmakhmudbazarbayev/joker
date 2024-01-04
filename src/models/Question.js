import Sequelize, { Model } from "sequelize";
import { v4 as uuidv4 } from 'uuid';

class Question extends Model {
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
        round_id: Sequelize.UUID,
        order: Sequelize.INTEGER,
        time: Sequelize.INTEGER,
        question: Sequelize.JSONB
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
    this.belongsTo(models.Quiz, { foreignKey: "quiz_id", as: "quiz" });
    this.hasMany(models.Answer, { foreignKey: "question_id", as: "answers" });
  }
}

export default Question;