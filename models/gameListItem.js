const { Schema, model } = require("mongoose");

const GameListItemSchema = new Schema({
  id: String,
  ruTitle: String,
  enTitle: String,
  link: String,
  cover: String,
  description: String,
  screens: [String],
  originalPrice: Number,
  publisher: String,
  developer: String,
  releaseDate: String,
  esrb: String,
  featuresList: [String],
  genres: [String],
  MSrating: Number,
  MSreviews: Number,
  ruLocalization: [String],
});

module.exports = model("game", GameListItemSchema);
