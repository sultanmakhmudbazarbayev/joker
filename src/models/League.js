import Sequelize, { Model } from "sequelize";
import { v4 as uuidv4 } from 'uuid';

class League extends Model {
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
          type: Sequelize.ENUM(
              "diamonds",
              "hearts",
              "spades",
              "clubs",
              "trump"
            ),
      },
        login: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.TEXT,
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
    this.hasOne(models.Suit, { foreignKey: "suit_id", as: "suit" });
  }
}

export default League;
