const { Router } = require("express");
const GameListItem = require("../models/gameListItem");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const gameListItems = await GameListItem.find();
    res.status(200).json(gameListItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/game/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const gameListItem = await GameListItem.findOne({ id: id });
    res.status(200).json(gameListItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
