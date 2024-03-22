import * as Yup from "yup";
import Question from "../../models/Question";
import { ValidationError } from "~/src/utils/ApiError";
import Round from "../../models/Round";
import Answer from "../../models/Answer";
import { DEFAULT_QUESTION_TIME, DEFAULT_QUESTION_TYPE, QUESTION_DEFAULT_IMAGE_URL, QUESTION_TYPES } from "../../constants";
import QuestionType from "../../models/QuestionType";
import QuestionTime from "../../models/QuestionTime";

const controller = {
    create: async (req, res, next) => {
    try {
        
        const {question_id} = req.query;
        const values = {
            question_id: question_id,
            correct: req.body.correct,
            answer: req.body.answer
        }

        await Answer.create(values)

    return res.status(200).json({});
    } catch (error) {
      next(error);
    }
    },

    update: async (req, res, next) => {
        try {
            
            const { id } = req.params;
            const values = {
                correct: req.body.correct,
                answer: req.body.answer,
                image: req.body.image,
                comment: req.body.comment
            }
    
            await Answer.update(values, {
                where: {
                    id
                }
            })
    
        return res.status(200).json({ ok: "Updated seccessfully." });
        } catch (error) {
          next(error);
        }
        },

    delete: async (req, res, next) => {
        try {
            
            const {id} = req.params;
    
            await Answer.destroy({
                where: {
                    id
                }
            })
    
        return res.status(200).json({});
        } catch (error) {
          next(error);
        }
        },
};

export default controller;
