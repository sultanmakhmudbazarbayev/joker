import * as Yup from "yup";
import Player from "../models/Player";
import { ValidationError } from "~/src/utils/ApiError";

const controller = {
    add: async (req, res, next) => {
    try {
    const values = {
        players: req.body.players,
    }

    const schema = Yup.object()
        .shape({
            players: Yup.array().required(),
        });

    if (!(await schema.isValid(values))) {
        throw new ValidationError();
    } 

    for(const player of values.players) {
        await Player.create({
            name: player.name,
            team_id: player.team_id
        })
    }

    return res.status(200).json({
        status: "OK"
    });
    } catch (error) {
      next(error);
    }
  },
};

export default controller;
