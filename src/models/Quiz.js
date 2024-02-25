import Sequelize, { Model } from "sequelize";
import { v4 as uuidv4 } from 'uuid';

import { DEFAULT_QUESTION_TIME, DEFAULT_QUESTION_TYPE } from "../constants";
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

        const defaultQuestionType = await sequelize.models.QuestionType.findOne({
          where: {
              technical_name: DEFAULT_QUESTION_TYPE.technical_name
          }
        })
    
        const defaultQuestionTime = await sequelize.models.QuestionTime.findOne({
            where: {
                time: DEFAULT_QUESTION_TIME.time
            }
        })

        for(const round of quizRounds) {
          const defaultQuestionData = {
            round_id: round.id,
            quiz_id: quizId,
            order: 1,
            question: "How are you doing?",
            question_type_id: defaultQuestionType.id,
            question_time_id: defaultQuestionTime.id,
            image: QUESTION_DEFAULT_IMAGE_URL,
            audio: null,
            video: null
          }

          const question = await sequelize.models.Question.create(defaultQuestionData)

          console.log('question-answer', question)

          await sequelize.models.Answer.create({
            question_id: question.id,
            answer: {text: "Good!"},
            correct: false
          })

          await sequelize.models.Answer.create({
            question_id: question.id,
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