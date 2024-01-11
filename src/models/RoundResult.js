import Sequelize, { Model } from "sequelize";
import { v4 as uuidv4 } from 'uuid';

class RoundResult extends Model {
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
        quiz_id: Sequelize.UUID,
        round_id: Sequelize.UUID,
        result: Sequelize.JSONB
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
    // this.belongsTo(models.Quiz, { foreignKey: "quiz_id", as: "quiz" });
    // this.belongsTo(models.Round, { foreignKey: "round_id", as: "round" });
  }
}

export default RoundResult;