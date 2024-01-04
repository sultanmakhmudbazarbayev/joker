import * as Yup from "yup";
import Team from "../models/Team";
import { ValidationError } from "~/src/utils/ApiError";

let controller = {
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

    await Team.create(values)

    return res.status(200).json({
        msg: "success",
    });
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {

    return res.status(200).json({
        msg: "success",
    });
    } catch (error) {
      next(error);
    }
  },
};

export default controller;
