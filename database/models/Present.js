const sequelize = require('../sequelize');
const { DataTypes } = require('sequelize');

const Present = sequelize.define('Present', {
    id: {
        type: sequelize.UUID,
        defaultValue: sequelize.literal("uuid_generate_v4()"),
        primaryKey: true,
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
    name: {
        type: DataTypes.TEXT
    },
  },
  {
    sequelize,
    timestamps: true,
    paranoid: true,
    underscored: true,
  }
);

export default Present;
