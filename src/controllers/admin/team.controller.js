import * as Yup from "yup";
import Team from "../../models/Team";
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

    const team = await Team.create(values)

    return res.status(200).json({
        status: "OK",
        data: team
    });
    } catch (error) {
      next(error);
    }
  },

  get_teams: async (req, res, next) => {
    try {

    const teams = await Team.findAll()

    return res.status(200).json({
        status: "OK",
        data: teams
    });
    } catch (error) {
      next(error);
    }
  },

  get_team_by_id: async (req, res, next) => {
    try {

    const {id} = req.params;

    const team = await Team.findByPk(id)

    return res.status(200).json({
        status: "OK",
        data: team
    });
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {

    const {id} = req.params;
    

    return res.status(200).json({
        status: "OK",
        data: 'team'
    });
    } catch (error) {
      next(error);
    }
  },
};

export default controller;
