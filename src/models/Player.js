import Sequelize, { Model } from "sequelize";
import { v4 as uuidv4 } from 'uuid';

class Player extends Model {
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
        name: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        image: Sequelize.STRING,
        is_capitan: Sequelize.BOOLEAN,
        team_id: {
          type: Sequelize.UUID,
          allowNull: false,
        }
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
    this.belongsTo(models.Team, { foreignKey: "team_id", as: "team" });
  }
}

export default Player;