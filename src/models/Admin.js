import Sequelize, { Model } from "sequelize";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcryptjs";

class Admin extends Model {
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

    this.addHook("beforeSave", async (item) => {
      if (item.password) {
        item.password_hash = await bcrypt.hash(item.password, 8);
      }
    });
    
    // this.sync({ alter: true });
    return this;
  }

  static associate(models) {
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default Admin;

