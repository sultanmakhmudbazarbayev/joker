import Sequelize, { Model } from "sequelize";
import { v4 as uuidv4 } from 'uuid';

import { QUESTION_TYPES } from "../constants";
import { QUESTION_DEFAULT_IMAGE_URL } from "../constants";

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
        ready: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        }
      },
      {
        sequelize,
        timestamps: true,
        paranoid: true,
        underscored: true,
      }
    );

    this.addHook("afterCreate", async (item, options) => {
        const quizId = item.id;

        await sequelize.models.Round.createRoundsForQuiz(quizId)
        
        const quizRounds = await sequelize.models.Round.findAll({
          where: {
            quiz_id: quizId,
          }
        })

        for(const round of quizRounds) {
          const defaultQuestionData = {
            round_id: round.id,
            quiz_id: quizId,
            order: 1,
            time: 15,
            question: "How are you doing?",
            type: QUESTION_TYPES.withAnswers.technical_name,
            image: QUESTION_DEFAULT_IMAGE_URL,
            audio: null,
            video: null
          }

          const quesiton = await sequelize.models.Question.create(defaultQuestionData)

          await sequelize.models.Answer.create({
            quesiton_id: quesiton.id,
            answer: {text: "Good!"},
            correct: false
          })

          await sequelize.models.Answer.create({
            quesiton_id: quesiton.id,
            answer: {text: "Marvellous!"},
            correct: true
          })

        }

    });

    // this.sync({ alter: true });
    return this;
  }

  static associate(models) {
    this.hasMany(models.Question, { foreignKey: "quiz_id", as: "questions" });
    this.hasMany(models.Round, { foreignKey: "quiz_id", as: "rounds" });

  }
}

export default Quiz;