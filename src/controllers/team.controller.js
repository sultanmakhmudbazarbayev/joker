import * as Yup from "yup";
import Team from "../models/Team";
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

    await Team.create(values)

    return res.status(200).json({
        msg: "success",
    });
    } catch (error) {
      next(error);
    }
  },
};

export default controller;
