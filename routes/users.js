module.exports = function (upload) {
  const express = require("express");
  const router = express.Router();
  const User = require("../models/User");

  // POST route to register a new user
  router.post(
    "/",
    upload.fields([
      { name: "photo", maxCount: 1 },
      { name: "signature", maxCount: 1 },
    ]),
    (req, res) => {
      User.findOne({
        $or: [{ rollNumber: req.body.rollNumber }, { phone: req.body.phone }],
      })
        .then((existingUser) => {
          if (existingUser) {
            // If user with same roll number or phone number exists, send an error response
            return res
              .status(400)
              .json("Error: Roll number or phone number already exists");
          }

          // Create a new user
          const newUser = new User({
            name: req.body.name,
            dob: req.body.dob,
            phone: req.body.phone,
            rollNumber: req.body.rollNumber,
            pinCode: req.body.pinCode,
            physics: req.body.physics,
            chemistry: req.body.chemistry,
            mathematics: req.body.mathematics,
            english: req.body.english,
            photo: req.files["photo"] ? req.files["photo"][0].path : "",
            signature: req.files["signature"]
              ? req.files["signature"][0].path
              : "",
          });

          // Save the new user to the database
          newUser
            .save()
            .then(() => res.json("Student added!"))
            .catch((err) => res.status(400).json("Error: " + err));
        })
        .catch((err) => res.status(500).json("Error: " + err));
    }
  );

  // GET route to fetch user data
  router.get("/:rollNumber/:dob", (req, res) => {
    User.findOne({
      rollNumber: req.params.rollNumber,
      dob: new Date(req.params.dob),
    })
      .then((user) => res.json(user))
      .catch((err) => res.status(400).json("Error: " + err));
  });

  return router;
};
