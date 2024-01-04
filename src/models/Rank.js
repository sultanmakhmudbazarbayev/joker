import Sequelize, { Model } from "sequelize";
import { v4 as uuidv4 } from 'uuid';

class Rank extends Model {
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
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "10",
                "jack",
                "queen",
                "king",
                "ace",
                "joker",
              ),
        },
        league_id: {
            type: Sequelize.UUID,
        },
        suit_id: {
            type: Sequelize.UUID,
        },
        present_id: {
            type: Sequelize.UUID,
        }
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

export default Rank;
