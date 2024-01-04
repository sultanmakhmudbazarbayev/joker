import * as Yup from "yup";
import Admin from "../../models/Admin";
import { JwtService } from "../../services/jwt.service.js";
import { BadRequestError, UnauthorizedError, ValidationError } from "../../utils/ApiError";

let controller = {
  login: async (req, res, next) => {
    try {
        const values = {
            login: req.body.login,
            password: req.body.password,
        }
        const schema = Yup.object()
        .shape({
            login: Yup.string().required(),
            password: Yup.string().required(),
        });

      if (!(await schema.isValid(values))) {
          throw new ValidationError();
      } 

      const user = await Admin.findOne({
        where: { 
            login: values.login 
        },
      });

      if (!user) {
          throw new BadRequestError();
      } 

      if (!(await user.checkPassword(values.password))) {
          throw new UnauthorizedError();
      } 

      const token = JwtService.jwtSign({
        user_id: user.id,
      });

      return res.status(200).json({ user, token });
    } catch (error) {
      next(error);
    }
  },
};

export default controller;
