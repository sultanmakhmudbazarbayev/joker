import * as Yup from "yup";
import Player from "../models/Player";
import { ValidationError } from "~/src/utils/ApiError";

const controller = {
    create: async (req, res, next) => {
    try {
    const values = {
        name: req.body.name,
        team_id: req.body.team_id,
    }

    const schema = Yup.object()
        .shape({
            name: Yup.string().required(),
            team_id: Yup.string().required(),
        });

    if (!(await schema.isValid(values))) {
        throw new ValidationError();
    } 

    await Player.create(values)

    return res.status(200).json({
        status: "OK"
    });
    } catch (error) {
      next(error);
    }
  },
};

export default controller;
