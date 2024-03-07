import * as Yup from "yup";
import { ValidationError } from "~/src/utils/ApiError";
import Tablet from "../../models/Tablet";
import Team from "../../models/Team";

let controller = {
  set_tablets: async (req, res, next) => {
    try {

    const {tablets} = req.body

    const formattedTablets = tablets.map((tablet => {
      return {
        team_id: tablet.id,
        number: tablet.number
      }
    }))

    console.log('tablets', formattedTablets)

    await Tablet.destroy({
      where: {},
    });

    await Tablet.bulkCreate(formattedTablets)

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

  get_tablet: async (req, res, next) => {
    try {

    const {number} = req.query;

    const tablet = await Tablet.findOne({
        where: {
          number: number
        },
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
        data: tablet
    });
    } catch (error) {
      next(error);
    }
  },
};

export default controller;
