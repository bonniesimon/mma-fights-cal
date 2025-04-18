import { DataTypes, Model } from "sequelize";
import sequelize from "../db/database.js";

class Event extends Model {}

Event.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    eventId: {
      type: DataTypes.STRING,
      unique: true,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fights: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Event",
  }
);

export default Event;
