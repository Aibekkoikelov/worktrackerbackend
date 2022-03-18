const express = require("express");
const router = express.Router();
const db = require("../models");
const { body, validationResult } = require("express-validator");
const { Op } = require("sequelize");
const _ = require("lodash");


router.get("/users", (req, res) => {
  db.Users.findAll({
    attributes: { exclude: ["password"] },
  }).then((users) => res.send(users));
});

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

router.put("/users/:id", body("password").isLength({min: 7}), (req, res) => {
   db.Users.findByPk(req.params.id).then((user) => {
      if (user) {
         user.update({
            password: req.body.password,
         }).then((user) => res.send({"message": "User updated"}));
      } else {
         res.status(404).send("User not found");
      }
   });
})

router.delete("/users/:id", (req, res) => { 
   db.Users.findByPk(req.params.id).then((user) => {
      if (user) {
         user.destroy().then(() => res.send({"message": "User deleted"}));
      } else {
         res.status(404).send("User not found");
      }
   });

});
router.get("/users/search", (req, res) => {
  const filter = {};
  const findAllParams = {};

  if (req.query.username) {
    filter.username = {
      [Op.like]: `%${req.query.username}%`,
    };
  }

  if (!_.isEmpty(filter)) {
    findAllParams.where = filter;
  }

  db.Users.findAll(findAllParams)
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send(err));
});
module.exports = router;
