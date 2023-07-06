const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const Users = require("./users");
const upload = require("./Service/imageUpload");
const Department = require("./Model/Deparrtment");

const singleUpload = upload.single("image");

require("dotenv").config();

let app = express();
let port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(
    "mongodb+srv://harman:qT5otKfu6HOCqG3y@documentmanagementsyste.wgavprz.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected!");
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((err) => console.log(err));

app.post("/login", async (req, res) => {
  try {
    const users = await Users.find({
      email: req.body.email,
      password: req.body.password,
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/add-profile-picture", function (req, res) {
  singleUpload(req, res, function (err) {
    if (err) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(200).json({ status: true });
    }
  });
});

app.post("/create_User", async (req, res) => {
  try {
    const users = await Users.create(req.body);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/usres", async (req, res) => {
  try {
    const users = await Users.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/checkUserEmail", async (req, res) => {
  try {
    let otp = Math.floor(1000 + Math.random() * 9000);

    let newArr = {
      token: "",
    };

    const users = await Users.find({
      email: req.body.email,
    });

    if (users.length != 0) {
      const update = await Users.findByIdAndUpdate(users[0]._id, {
        otp,
      });

      newArr.token = users[0]._id;
    }
    res.status(200).json(newArr);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/verifyotp", async (req, res) => {
  try {
    const users = await Users.find({
      _id: req.body.token,
    });

    if (users.length != 0) {
      let enteredOTP = req.body.otp;
      let correctOTP = users[0].otp;

      if (enteredOTP == correctOTP) {
        res.status(200).json(true);
      } else {
        res.status(200).json(false);
      }
    } else {
      res.status(200).json(false);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/updatePassword", async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);
    const users = await Users.findByIdAndUpdate(id, {
      password: req.body.Password,
    });
    if (!users) {
      return res
        .status(404)
        .json({ message: `cannot find any product with ID ${id}` });
    }
    res.status(200).json(true);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/delete_user", async (req, res) => {
  try {
    const { id } = req.body;
    const users = await Users.findByIdAndDelete(id);
    if (!users) {
      return res
        .status(404)
        .json({ message: `cannot find any product with ID ${id}` });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/update_User", async (req, res) => {
  try {
    const { id, emp_code, f_name, l_name, title, email, password } = req.body;

    const users = await Users.findByIdAndUpdate(id, {
      emp_code,
      f_name,
      l_name,
      title,
      email,
      password,
    });
    if (!users) {
      return res
        .status(404)
        .json({ message: `cannot find any product with ID ${id}` });
    }
    res.status(200).json(true);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/addDepartment", async (req, res) => {
  try {
    singleUpload(req, res, function (err) {
      if (err) {
        res.status(500).json({ message: err.message });
      } else {
        Department.create({
          name: req.body.name,
          img: req.file.location,
        });
        res.status(200).json({ status: true });
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/getDepartment", async (req, res) => {
  try {
    const dep = await Department.find({});
    res.status(200).json(dep);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
