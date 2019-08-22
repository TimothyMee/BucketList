const express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello v1.0 here ");
});

module.exports = router;
