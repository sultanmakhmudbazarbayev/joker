import Sequelize, { Model } from "sequelize";
import { v4 as uuidv4 } from 'uuid';

class QuizSession extends Model {
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
        name: Sequelize.TEXT,
        image: Sequelize.TEXT,
        teams: {
            type: Sequelize.ARRAY(Sequelize.TEXT),
        },
        quiz_id: Sequelize.UUID,
        number: Sequelize.INTEGER
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
    this.belongsTo(models.Quiz, { foreignKey: "quiz_id", as: "quiz" });

  }
}

export default QuizSession;