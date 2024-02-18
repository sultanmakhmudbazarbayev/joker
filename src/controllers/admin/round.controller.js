import * as Yup from "yup";
import Round from "../../models/Round";
import Question from "../../models/Question";

const controller = {
    get_round_by_id: async (req, res, next) => {
    try {
        const { id } = req.params 
        const round = await Round.findByPk(id, {
            include: {
                model: Question,
                as: "questions",
                order: [['order', 'ASC']]
            }
        })

    return res.status(200).json({
        round
    });
    } catch (error) {
      next(error);
    }
  },
};

export default controller;
