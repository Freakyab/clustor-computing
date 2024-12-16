const express = require("express");
const Account = require("../models/account");
const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { name, password } = req.body;
    if (!name || !password) {
      return res.status(400).json({
        status: false,
        message: "Data not found",
      });
    }

    const existingUser = await Account.findOne({
      name,
    });


    if (existingUser) {
      return res.json({
        status: true,
        message: "User found",
        user: existingUser,
      });
    }

    return res.json({
      status: false,
      message: "User not found",
    });
  } catch (err) {
    console.error(err);
    res.status(400).send("Internal Error");
  }
});
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        status: false,
        message: "Data not found",
      });
    }
    const isUserExists = await Account.findOne({
      email,
    });
    console.log(isUserExists);

    if (isUserExists) {
      return res.json({ status: false, message: "User already Exits" });
    }

    const newUser = new Account({
      name,
      email,
      password,
    });

    if (newUser) {
      await newUser.save();
      return res.status(201).json({
        status: true,
        message: "User create sucessfully",
      });
    }

    return res.status(400).json({
      status: false,
      message: "User not created",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Error");
  }
});

module.exports = router;
