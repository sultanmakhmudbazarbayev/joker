import Sequelize, { Model } from "sequelize";
import { v4 as uuidv4 } from 'uuid';

class Tablet extends Model {
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
        number: Sequelize.INTEGER,
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
    this.hasOne(models.Team, { foreignKey: "team_id", as: "tablet-team" });
  }

}

export default Tablet;

