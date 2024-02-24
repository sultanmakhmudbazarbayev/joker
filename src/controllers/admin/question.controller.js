import * as Yup from "yup";
import Question from "../../models/Question";
import { ValidationError } from "~/src/utils/ApiError";
import Round from "../../models/Round";
import Answer from "../../models/Answer";
import { QUESTION_DEFAULT_IMAGE_URL, QUESTION_TYPES } from "../../constants";
import QuestionType from "../../models/QuestionType";
import QuestionTime from "../../models/QuestionTime";

const controller = {
    create: async (req, res, next) => {
    try {
    const values = {
        quiz_id: req.body.quiz_id,
        round_id: req.body.round_id,
        order: req.body.order,
        time: req.body.time,
        question: req.body.question,
        image: req.body.image ? req.body.image : QUESTION_DEFAULT_IMAGE_URL
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

    update: async (req, res, next) => {
        try {
        const { id } = req.params;

        const { image } = req.body;

        const values = {
            image,
        }

        const question = await Question.update(values, {
            where: {
                id
            }
        })

        return res.status(200).json({ok: "OK"});
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

        return res.status(200).json({question});
        } catch (error) {
        next(error);
        }
    },

    get_question_types: async (req, res, next) => {

        const questionTypes = await QuestionType.findAll()

        return res.status(200).json({types: questionTypes});
    },

    create_question_types: async (req, res, next) => {
        try {
        const values = {
            name: req.body.name,
            technical_name: req.body.technical_name,
        }
    
        const schema = Yup.object()
            .shape({
                name: Yup.string().required(),
                technical_name: Yup.string().required(),
            });
    
        if (!(await schema.isValid(values))) {
            throw new ValidationError();
        } 
    

        await QuestionType.create(values)
    
        return res.status(200).json({
            status: "OK"
        });
        } catch (error) {
          next(error);
        }
    },
    
    create_question_time: async (req, res, next) => {
        try {
        const values = {
            time: req.body.time,
        }
    
        const schema = Yup.object()
            .shape({
                time: Yup.number().required(),
            });
    
        if (!(await schema.isValid(values))) {
            throw new ValidationError();
        } 
    

        await QuestionTime.create(values)
    
        return res.status(200).json({
            status: "OK"
        });
        } catch (error) {
          next(error);
        }
    },
    get_question_time: async (req, res, next) => {
        const questionTimes = await QuestionTime.findAll()

        return res.status(200).json({time_options: questionTimes});
    },
};

export default controller;
