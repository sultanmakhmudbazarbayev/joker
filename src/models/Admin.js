import Sequelize, { Model } from "sequelize";
import { v4 as uuidv4 } from 'uuid';

class Admin extends Model {
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
        login: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
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

export default Admin;

