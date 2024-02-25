import Sequelize, { Model } from "sequelize";
import { v4 as uuidv4 } from 'uuid';

class QuestionType extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.TEXT,
          defaultValue: () => uuidv4(),
          primaryKey: true,
          allowNull: false,
          unique: true,
        },
        name: Sequelize.STRING,
        technical_name: Sequelize.STRING,

      },
      {
        sequelize,
        timestamps: true,
        paranoid: true,
        underscored: true,
      }
    );

    // this.sync({ alter: true });
    return this;
  }

  static associate(models) {
    // this.belongsTo(models.Question, { foreignKey: "question_type_id", as: "question_type" });
  }
}

export default QuestionType;