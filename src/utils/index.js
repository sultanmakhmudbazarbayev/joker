import fs from "fs";
import Admin from "../models/Admin";
import Answer from "../models/Answer";
import League from "../models/League";
import Player from "../models/Player";
import Present from "../models/Present";
import Question from "../models/Question";
import Quiz from "../models/Quiz";
import Rank from "../models/Rank";
import Result from "../models/Result";
import Round from "../models/Round";
import RoundResult from "../models/RoundResult";
import Suit from "../models/Suit";
import Team from "../models/Team";
import QuizSession from "../models/QuizSession";
import Tablet from "../models/Tablet";
import QuestionType from "../models/QuestionType";
import QuestionTime from "../models/QuestionTime";

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

export const syncModels = async () => {
  try {
    await Admin.sync();
    await Tablet.sync();
    await Answer.sync();
    await League.sync();
    await Player.sync();
    await Present.sync();
    await Quiz.sync();
    await Rank.sync();
    await Result.sync();
    await Round.sync();
    await Question.sync();
    await QuestionType.sync();
    await QuestionTime.sync();
    await RoundResult.sync();
    await Suit.sync();
    await Team.sync();
    await QuizSession.sync();

    console.log('[SEQUELIZE] Models synchronized successfully');
  } catch (error) {
    console.error('[SEQUELIZE] Error synchronizing models:', error);
  }
};