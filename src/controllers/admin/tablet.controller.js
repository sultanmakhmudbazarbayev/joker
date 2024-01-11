import * as Yup from "yup";
import { ValidationError } from "~/src/utils/ApiError";
import Tablet from "../../models/Tablet";
import Team from "../../models/Team";

let controller = {
  assign: async (req, res, next) => {
    try {
    const values = {
        tablet_number: req.body.tablet_number,
        team_id: req.body.team_id,
    }

    const schema = Yup.object()
        .shape({
            tablet_number: Yup.number().required(),
            team_id: Yup.string().required(),
        });

    if (!(await schema.isValid(values))) {
        throw new ValidationError();
    } 

    await Tablet.create(values)

    return res.status(200).json({
        status: "OK"
    });
    } catch (error) {
      next(error);
    }
  },

  get_tablet_teams: async (req, res, next) => {
    try {
    const tablets = await Tablet.findAll({
        include: [
            {
                model: Team,
                as: 'tablet-team',
                attributes: [],
            },
        ]
    })

    return res.status(200).json({
        status: "OK",
        data: tablets
    });
    } catch (error) {
      next(error);
    }
  },
};

export default controller;
