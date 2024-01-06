import * as Yup from "yup";
import Question from "../models/Question";
import { ValidationError } from "~/src/utils/ApiError";

const controller = {
    create: async (req, res, next) => {
    try {
    const values = {
        round_id: req.body.round_id,
        quiz_id: req.body.quiz_id,
        order: req.body.order,
        time: req.body.time,
        question: req.body.question
    }

    const schema = Yup.object()
        .shape({
            round_id: Yup.string().required(),
            quiz_id: Yup.string().required(),
            order: Yup.number(),
            time: Yup.time(),
            question: Yup.object(),
        });

    if (!(await schema.isValid(values))) {
        throw new ValidationError();
    } 

    await Question.create(values)

    return res.status(200).json({
        msg: "success",
    });
    } catch (error) {
      next(error);
    }
  },
};

export default controller;
