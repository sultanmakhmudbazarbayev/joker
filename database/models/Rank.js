const sequelize = require('../sequelize');

const Rank = sequelize.define('Rank', {
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
        type: sequelize.UUID,
    },
    suit_id: {
        type: sequelize.UUID,
    },
    present_id: {
        type: sequelize.UUID,
    }
  },
  {
    sequelize,
    timestamps: true,
    paranoid: true,
    underscored: true,
  }
);

export default Rank;
