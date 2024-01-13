import Sequelize, { Model } from "sequelize";
import { v4 as uuidv4 } from 'uuid';

import { QUIZ_ROUND_TYPES } from "../constants";

class Round extends Model {
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
        name: Sequelize.TEXT, // 
        count: Sequelize.INTEGER, // which round
        quiz_id: Sequelize.UUID,
        round_type: {
            type: Sequelize.ENUM(
                "choice",
                "combination",
                "spades_queen",
                "joker_secret",
                "solitaire",
                "joker",
                "royal_flash",
                "all_in"
              ),
        },
      },
      {
        sequelize,
        timestamps: true,
        paranoid: true,
        underscored: true,
      }
    );

    this.sequelizeInstance = sequelize;
    // this.sync({ alter: true });
    return this;
  }


  static async createRoundsForQuiz(quiz_id) {
    const roundsData = QUIZ_ROUND_TYPES.map((round) => ({
      ...round,
      quiz_id,
    }));
  
    await Promise.all(roundsData.map((round) => this.sequelizeInstance.create(round)));
  }

  static associate(models) {
    this.hasMany(models.Question, { foreignKey: "round_id", as: "questions" });
    // this.hasOne(models.RoundResult, { foreignKey: "round_id", as: "round_result" });
    this.belongsTo(models.Quiz, { foreignKey: "quiz_id", as: "quiz" });
  }
}

export default Round;
