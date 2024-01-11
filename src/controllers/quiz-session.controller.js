import * as Yup from "yup";
import QuizSession from "../models/QuizSession";
import { ValidationError, QuizNotFoundError } from "../utils/ApiError";
import Quiz from "../models/Quiz";

const controller = {
    create: async (req, res, next) => {
    try {
    const values = {
        quiz_id: req.body.quiz_id,
    }

    const schema = Yup.object().shape({quiz_id: Yup.string().required()});
    if (!(await schema.isValid(values))) {
        throw new ValidationError();
    }

    const quiz = await Quiz.findByPk(quiz_id);
    if(!quiz) {
        throw new QuizNotFoundError();
    }

    const sessionNumber = Math.floor(1000 + Math.random() * 9000);

    await QuizSession.create({
        quiz_id: quiz_id,
        number: sessionNumber
    })

    return res.status(200).json({
        status: "OK",
        session_number: sessionNumber
    });
    } catch (error) {
      next(error);
    }
  },
};

export default controller;
