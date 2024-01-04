import Sequelize, { Model } from "sequelize";
import { v4 as uuidv4 } from 'uuid';

class Suit extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.TEXT,
          defaultValue: () => uuidv4(), // Use Sequelize hook to generate UUID
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
            "silver",
            "gold",
            "platinum",
            "brilliant",
          ),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        paranoid: true,
        underscored: true,
      }
    );

    this.sync({ alter: true });
    return this;
  }

  static associate(models) {
    
  }
}

export default Suit;