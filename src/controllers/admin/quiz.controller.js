import * as Yup from "yup";
import Quiz from "../../models/Quiz";
import Round from "../../models/Round";
import { ValidationError } from "~/src/utils/ApiError";

const controller = {
  create: async (req, res, next) => {
    try {
    const values = {
        name: req.body.name,
        image: req.body.image,
    }

    const schema = Yup.object()
        .shape({
            name: Yup.string().required(),
            image: Yup.string(),
        });

    if (!(await schema.isValid(values))) {
        throw new ValidationError();
    } 

    const quiz = await Quiz.create(values)
    
    await Round.createRoundsForQuiz(quiz.id)


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
