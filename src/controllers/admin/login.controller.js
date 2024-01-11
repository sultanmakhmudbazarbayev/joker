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

      const _user = await Admin.findOne({
        where: { 
            login: values.login 
        },
      });

      if (!_user) {
          throw new BadRequestError();
      } 

      if (!(await _user.checkPassword(values.password))) {
          throw new UnauthorizedError();
      } 

      const token = JwtService.jwtSign({
        user_id: _user.id,
      }, process.env.JWT_SECRET);

      const user = {
        id: _user.id,
        name: _user.name,
        login: _user.login,
        createdAt: _user.createdAt
      }

      return res.status(200).json({
        status: "OK",
        data: {
          user: user,
          token: token
        }
      });
    } catch (error) {
      next(error);
    }
  },
};

export default controller;
