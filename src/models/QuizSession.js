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
        number: Sequelize.INTEGER,
        results: Sequelize.JSONB
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

  static sessionNumberExists = async (sessionNumber) => {
    const existingSession = await QuizSession.findOne({
      where: { number: sessionNumber },
    });
  
    return !!existingSession;
  };
  
  static generateUniqueSessionNumber = async () => {
    let sessionNumber;
    do {
      sessionNumber = Math.floor(1000 + Math.random() * 99999999);
    } while (await this.sessionNumberExists(sessionNumber));
  
    return sessionNumber;
  };

  static associate(models) {
    this.belongsTo(models.Quiz, { foreignKey: "quiz_id", as: "quiz" });

  }
}

export default QuizSession;