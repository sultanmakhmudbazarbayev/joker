import * as Yup from "yup";
import Admin from "../../models/Admin";
import { ValidationError } from "~/src/utils/ApiError";

let controller = {
    create: async (req, res, next) => {
    try {
    const values = {
        name: req.body.name,
        login: req.body.login,
        password: req.body.password,
    }

    const schema = Yup.object()
        .shape({
            name: Yup.string().required(),
            login: Yup.string().required(),
            password: Yup.string().required().min(6),
        });

    if (!(await schema.isValid(values))) {
        throw new ValidationError();
    } 

    await Admin.create(values)

    return res.status(200).json({
        msg: "User has been created"
    });
    } catch (error) {
      next(error);
    }
  },
};

export default controller;
