import fs from "fs";

export const getFiles = (path) => {
  return fs
    .readdirSync(__dirname + path)
    .filter((file) => file.endsWith(".js"));
};

export const getPagingData = (data, current = 1, limit) => {
  const { count: total, rows } = data;
  const totalPages = Math.ceil(total / limit);

  return { total, data: rows, totalPages, current };
};

export const getPagination = (page = 1, size) => {
  const limit = size ? size : 10;
  const offset = (page - 1) * limit;

  return { limit, offset };
};