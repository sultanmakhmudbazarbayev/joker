const sequelize = require('../sequelize');

const Suit = sequelize.define('Suit', {
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
            "silver",
            "gold",
            "platinum",
            "brilliant",
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

export default Suit;
