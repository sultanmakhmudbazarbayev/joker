import * as Yup from "yup";
import Player from "../../models/Player";
import { ValidationError } from "~/src/utils/ApiError";
import Team from "../../models/Team";
import { Op } from "sequelize";

const controller = {
  add: async (req, res, next) => {
    try {
    const values = {
        name: req.body.name,
        team_id: req.body.team_id,
        image: req.body.image
    }

    const schema = Yup.object()
        .shape({
            name: Yup.string().required(),
            team_id: Yup.string().required(),
            image: Yup.string()
        });

    if (!(await schema.isValid(values))) {
        throw new ValidationError();
    } 

    const player = await Player.create(values)

    return res.status(200).json({
        status: "OK",
        data: player
    });
    } catch (error) {
      next(error);
    }
  },

  get: async (req, res, next) => {
    const {teamId} = req.params;

    const players = await Player.findAll({
        where: {
            team_id: teamId
        }
    })

    return res.status(200).json({
        status: "OK",
        data: players
    });
  },

  get_by_id: async (req, res, next) => {
    const {id} = req.params;

    const player = await Player.findByPk(id)

    return res.status(200).json({
        status: "OK",
        data: player
    });
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params; 
      const { team_id, name, image, is_capitan } = req.body;
      
      const playerValues = {
        name,
        image,
        is_capitan
      };
  
      await Player.update(playerValues, {
        where: { id },
      });

      const updatedPlayer = await Player.findByPk(id)
  
      if (is_capitan) {
        await Player.update({is_capitan: false}, {
            where: {
                team_id: team_id,
                id: {
                    [Op.ne]: id
                }
            }
        })
        await Team.update({ capitan_id: id }, {
          where: { id: team_id },
        });
      }

    return res.status(200).json({
        status: "OK",
        data: updatedPlayer, 
    });

    } catch (error) {
      next(error);
    }
  },
  

  delete: async (req, res, next) => {
    const {id} = req.params;

    await Player.destroy({
        where: {
            id: id
        }
    })

    return res.status(200).json({
        status: "OK",
    });
  }
};

export default controller;
