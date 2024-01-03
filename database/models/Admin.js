const sequelize = require('../sequelize');
const { DataTypes } = require('sequelize');

const Admin = sequelize.define('Admin', {
    id: {
        type: sequelize.UUID,
        defaultValue: sequelize.literal("uuid_generate_v4()"),
        primaryKey: true,
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
    login: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: sequelize.VIRTUAL,
    password_hash: sequelize.STRING,
  },
  {
    sequelize,
    timestamps: true,
    paranoid: true,
    underscored: true,
  }
);

export default Admin;
