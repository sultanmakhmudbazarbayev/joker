import Sequelize, { Model } from "sequelize";
import { v4 as uuidv4 } from 'uuid';

class TeamAnswer extends Model {
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
        quiz_session_id: Sequelize.UUID,
        round_id: Sequelize.UUID,
        question_id: Sequelize.UUID,
        points: Sequelize.INTEGER,
        team_id: Sequelize.UUID
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
    // this.hasMany(models.Player, { foreignKey: "team_id", as: "players" });
    // this.belongsTo(models.Player, { foreignKey: "capitan_id", as: "capitan" });
    // this.hasOne(models.Rank, { foreignKey: "rank_id", as: "rank" });
    // this.hasOne(models.Present, { foreignKey: "present_id", as: "present" });
    // this.belongsTo(models.Tablet, { foreignKey: "team_id", as: "tablet" });

  }
}

export default TeamAnswer;
