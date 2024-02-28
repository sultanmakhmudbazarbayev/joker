import * as Yup from "yup";
import Quiz from "../../models/Quiz";
import Round from "../../models/Round";
import Question from "../../models/Question";
import Answer from "../../models/Answer";
import { ValidationError } from "~/src/utils/ApiError";
import QuestionTime from "../../models/QuestionTime";
import QuestionType from "../../models/QuestionType";

const controller = {
    getQuizById: async (req, res, next) => {
        try {
        const { id } = req.params;
    
        const quiz = await Quiz.findByPk(id, {
            include: [
                {
                    model: Round,
                    as: "rounds",
                    include: [
                        {
                            model: Question,
                            as: "questions",
                            include: [
                                {
                                    model: Answer,
                                    as: "answers",
                                    order: [['created_at', 'ASC']]
                                },
                            ],
                            
                        }
                    ],
                    order: [[{ model: Question, as: 'questions' }, 'order', 'ASC']]
                }
            ],
            order: [
                [{ model: Round, as: 'rounds' }, 'count', 'ASC'], 
                [{ model: Round, as: 'rounds' }, { model: Question, as: 'questions' }, 'order', 'ASC']           ]
        });
        
    
        return res.status(200).json({
            quiz
        });
        } catch (error) {
          next(error);
        }
    },
    get: async (req, res, next) => {
        try {

    
        const quizzes = await Quiz.findAll({
            order: [["createdAt", "DESC"]]
        });
        
    
        return res.status(200).json({
            status: "OK",
            data: quizzes
        });
        } catch (error) {
          next(error);
        }
    },
    create: async (req, res, next) => {
        try {
        const values = {
            name: req.body.name,
        }

        const schema = Yup.object()
            .shape({
                name: Yup.string().required(),
            });

        if (!(await schema.isValid(values))) {
            throw new ValidationError();
        } 

        const quiz = await Quiz.create(values)

        


        return res.status(200).json({
            status: "OK",
            data: quiz
        });
        } catch (error) {
        next(error);
        }
    },
    update: async (req, res, next) => {
        try {
            const { id: quiz_id } = req.params
            const values = {};

            if(req.body.name) {
                values.name = req.body.name
            }
            if(req.body.image) {
                values.image = req.body.image
            }

            const schema = Yup.object()
                .shape({
                    name: Yup.string(),
                    image: Yup.string(),
            });

            if (!(await schema.isValid(values))) {
                throw new ValidationError();
            } 
            if(values.name || values.image) {
                await Quiz.update(values, {
                    where: {
                        id: quiz_id
                    }
                })
            }

            const quiz = await Quiz.findByPk(quiz_id)

            return res.status(200).json({
                status: "OK",
                data: quiz
            });
        } catch (error) {
        next(error);
        }
    },
};

export default controller;
