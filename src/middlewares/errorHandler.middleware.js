import { Request, Response, NextFunction } from "express";
import _ from "lodash";
import { IsApiError, ApiError } from "../utils/ApiError.js";

const isJSON = (str) => {
  try {
    return JSON.parse(str) && !!str;
  } catch (e) {
    return false;
  }
};
/**
 * Global error handler for all routes
 * @param {ApiError} err
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export default (err, _req, res, next) => {
  if (res.headersSent) return next(err);
  if (IsApiError(err)) {
    let locale = _req.headers["app-locale"];
    if (!locale) locale = "ru";
    let message = "";
    if (isJSON(err.message)) {
      const errors = JSON.parse(err.message);
      message = errors[locale];
    }
    return res.status(err.statusCode).send(message);
  }
  if (_.isString(err)) {
    return res.status(500).send(err);
  }

  console.log(err);

  return res.status(500).send("Something went wrong");
};
