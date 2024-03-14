import Sequelize, { Model } from "sequelize";
import { v4 as uuidv4 } from 'uuid';

class Team extends Model {
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
        points_count: Sequelize.INTEGER, //game points (for wins)
        rank_id: Sequelize.UUID,
        visits_count: Sequelize.INTEGER, //number of games
        free_games_count: Sequelize.INTEGER,
        image: Sequelize.TEXT,
        capitan_id: Sequelize.UUID,
        team_id: Sequelize.UUID,
        capitan_image: Sequelize.TEXT,
        capitan_name: Sequelize.STRING,
        card: Sequelize.STRING
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
    this.hasMany(models.Player, { foreignKey: "team_id", as: "players" });
    this.belongsTo(models.Player, { foreignKey: "capitan_id", as: "capitan" });
    this.hasOne(models.Rank, { foreignKey: "rank_id", as: "rank" });
    this.hasOne(models.Present, { foreignKey: "present_id", as: "present" });
    this.belongsTo(models.Tablet, { foreignKey: "team_id", as: "tablet" });

  }
}

export default Team;