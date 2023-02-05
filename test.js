const express = require("express");
const router = express.Router();
const db = require("../config/database");

router.get("/posts", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  db.query("SELECT * FROM posts LIMIT $1 OFFSET $2", [limit, startIndex], (err, result) => {
    if (err) throw err;
    res.json({
      success: true,
      data: result.rows
    });
  });
});

module.exports = router;
