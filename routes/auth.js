const express = require("express");
const authRouter = express.Router();
const db = require("../models");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");


// POST /api/auth/register
authRouter.post("/login", (req, res) => { 

   const username = req.body.username;
   const user = { name: username };
   const token = jwt.sign(user, "secret");
   res.json({ token, "password": req.body.password });
  
    
})

function authenticateToken(req, res, next) {
   const authHeader = req.headers["authorization"];
   const token = authHeader && authHeader.split(" ")[1];
   if (token == null) return res.sendStatus(401);

   jwt.verify(token, "secret", (err, user) => {
      if (err) return res.sendStatus(403);
      req.username = user;
      next();
   });
}

module.exports = authRouter;