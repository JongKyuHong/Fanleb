/**
 * /users APIs
 */
const express = require("express");
const router = express.Router();
const UsersService = require("./users.service");
const usersService = new UsersService();

/**
 * 유저 카테고리 조회
 */
router.get("/categories", async function (req, res) {
  const { statusCode, responseBody } = await usersService.getCategories();

  res.statusCode = statusCode;
  res.send(responseBody);
});

module.exports = router;
