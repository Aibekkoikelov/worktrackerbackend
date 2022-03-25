const express = require("express");
const router = express.Router();
const db = require("../models");
const { body, validationResult } = require("express-validator");
const { Op } = require("sequelize");
const _ = require("lodash");

router.post(
  "/users",
  body("username").isEmail(),
  body("password").isLength({ min: 6 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    db.Users.create({
      username: req.body.username,
      password: req.body.password,
    }).then((user) => res.status(201).send(user));
  }
);

router.get("/users/:id(\\d+)", (req, res) => {
  db.Users.findByPk(req.params.id).then((user) => {
    if (user) {
      res.send(user);
    } else {
      res.status(404).send("User not found");
    }
  });
});

router.put(
  "/users/:id(\\d+)",
  body("password").isLength({ min: 7 }),
  (req, res) => {
    db.Users.findByPk(req.params.id).then((user) => {
      if (user) {
        user
          .update({
            password: req.body.password,
          })
          .then((user) => res.send({ message: "User updated" }));
      } else {
        res.status(404).send("User not found");
      }
    });
  }
);

router.delete("/users/:id", (req, res) => {
  db.Users.findByPk(req.params.id).then((user) => {
    if (user) {
      user.destroy().then(() => res.send({ message: "User deleted" }));
    } else {
      res.status(404).send("User not found");
    }
  });
});

router.get("/users", async (req, res) => {
  const page = req.query.page || 1;
  const limit = +req.query.limit || 5;

  const filter = {};
  const findAllParams = {
    attributes: { exclude: ["password"] },
    offset: (page - 1) * limit,
    limit: limit,
  };

  if (req.query.username) {
    filter.username = {
      [Op.like]: `%${req.query.username}%`,
    };
  }

  if (!_.isEmpty(filter)) {
    findAllParams.where = filter;
  }

  try {
     const result = await db.Users.findAndCountAll(findAllParams);
     const { count } = result;
     
       const pages = Math.ceil(count / limit);
     result.pages = pages
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});
module.exports = router;
