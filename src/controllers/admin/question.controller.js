import * as Yup from "yup";
import Question from "../../models/Question";
import { ValidationError } from "~/src/utils/ApiError";
import Round from "../../models/Round";
import Answer from "../../models/Answer";

const controller = {
    create: async (req, res, next) => {
    try {
    const values = {
        quiz_id: req.body.quiz_id,
        round_id: req.body.round_id,
        order: req.body.order,
        time: req.body.time,
        question: req.body.question
    }

    const schema = Yup.object()
        .shape({
            round_id: Yup.string().required(),
            quiz_id: Yup.string().required(),
            order: Yup.number(),
            time: Yup.number(),
            question: Yup.object(),
        });

    if (!(await schema.isValid(values))) {
        throw new ValidationError();
    } 

    const {questions} = await Round.findByPk(values.round_id, {
        include: {
            model: Question,
            as: "questions",
            order: [['order', 'ASC']]
        }
    })

    const order = questions[questions.length-1].order + 1;
    values.order = order;

    const question = await Question.create(values)

    return res.status(200).json({
        status: "OK",
        data: question
    });
    } catch (error) {
      next(error);
    }
    },

    get_question_by_id: async (req, res, next) => {
        try {
        const { id } = req.params;

        const question = await Question.findByPk(id, {
            include: {
                model: Answer,
                as: "answers",
            }
        })

        console.log('question', question)

        return res.status(200).json({question});
        } catch (error) {
        next(error);
        }
    },
};

export default controller;
