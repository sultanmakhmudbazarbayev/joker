const sequelize = require('../sequelize');
const { DataTypes } = require('sequelize');

const Player = sequelize.define('Player', {
    id: {
        type: sequelize.UUID,
        defaultValue: sequelize.literal("uuid_generate_v4()"),
        primaryKey: true,
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    team_id: {
        type: sequelize.UUID,
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

export default Player;
