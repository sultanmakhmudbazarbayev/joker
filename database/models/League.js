const sequelize = require('../sequelize');

const League = sequelize.define('League', {
    id: {
        type: sequelize.UUID,
        defaultValue: sequelize.literal("uuid_generate_v4()"),
        primaryKey: true,
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
    name: {
        type: sequelize.ENUM(
            "diamonds",
            "hearts",
            "spades",
            "clubs",
            "trump"
          ),
    },
  },
  {
    sequelize,
    timestamps: true,
    paranoid: true,
    underscored: true,
  }
);

export default League;
