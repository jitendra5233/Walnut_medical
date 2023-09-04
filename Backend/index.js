const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const Users = require("./Model/users");
const upload = require("./Service/imageUpload");

const Websetting = require("./Model/Websetting");

const sendOtp = require("./controllers/sendOtp");

const MachineData2 = require("./Model/MachineData2");
const UploadFiles = require("./Model/UploadFiles");

const MachineData = require("./Model/MachineData");

require("dotenv").config();

var multer = require("multer");

const doc1Upload = (req, res) => {
  return new Promise((resolve, reject) => {
    upload.single("file")(req, res, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

let app = express();
let port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use(express.static("files"));

app.use("/", express.static("build"));

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log("Connected!");
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/dist/" + "index.html");
});

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

app.post("/checkUserEmail", async (req, res) => {
  let { smtpHost, smtpPort, smtpUsername, smtpPassword } = req.body;

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

    sendOtp(
      "Techies Infotech",
      "harmanpreet.singh@iamtechie.com",
      req.body.email,
      "hosting_name",
      "renewal_date",
      "client_name",
      smtpHost,
      smtpPort,
      smtpUsername,
      smtpPassword,
      otp
    );

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

// web setting Api

app.get("/getwebsetting", async (req, res) => {
  try {
    const accounts = await Websetting.find({}).sort({ createdAt: -1 });
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/update_websetting", upload.single("image"), async (req, res) => {
  try {
    const {
      id,
      company_name,
      contact_email,
      carrer_email,
      watsapp_number,
      Contact_number,
      smtp_host,
      smtp_port,
      smtp_username,
      smtp_password,
      socialIcons,
    } = req.body;
    let websetting = await Websetting.findById(id);
    const imgLocation = req.file ? req.file.location : undefined;
    if (socialIcons) {
      const newSocialIcons = JSON.parse(socialIcons);
      const filteredSocialIcons = newSocialIcons.filter(
        (icon) => icon.icon_name && icon.social_url
      );
      if (filteredSocialIcons.length > 0) {
        if (websetting.socialIcons && websetting.socialIcons.length > 0) {
          websetting.socialIcons.push(...filteredSocialIcons);
        } else {
          websetting.socialIcons = filteredSocialIcons;
        }
      }
    }

    const updateObject = {
      company_name,
      contact_email,
      carrer_email,
      watsapp_number,
      Contact_number,
      smtp_host,
      smtp_port,
      smtp_username,
      smtp_password,
      img: imgLocation,
      loginimg: "null",
      socialIcons: websetting.socialIcons,
    };

    await Websetting.findByIdAndUpdate(id, updateObject);

    res.status(200).json({ status: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/update_loginimage", async (req, res) => {
  try {
    await doc1Upload(req, res);
    await Websetting.findByIdAndUpdate(req.body.id, {
      loginimg: req.file.location,
    });

    res.status(200).json({ status: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.post("/update_logo", async (req, res) => {
  try {
    await doc1Upload(req, res);
    await Websetting.findByIdAndUpdate(req.body.id, {
      img: req.file.location,
    });

    res.status(200).json({ status: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/deleteloginimg", async (req, res) => {
  try {
    const { id } = req.body;
    const result = await Websetting.deleteOne({ _id: id });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete(
  "/delete_social_icon/:websettingId/:socialIconId",
  async (req, res) => {
    try {
      const websettingId = req.params.websettingId;
      const socialIconId = req.params.socialIconId;
      const websetting = await Websetting.findById(websettingId);
      if (!websetting) {
        return res.status(404).json({ message: "Websetting not found" });
      }
      websetting.socialIcons = websetting.socialIcons.filter(
        (icon) => icon._id.toString() !== socialIconId
      );

      await websetting.save();

      res.status(200).json({ message: "Social icon deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Walnut Start

app.get("/getData", async (req, res) => {
  try {
    const data = await MachineData.find({});
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/downloadData/", async (req, res) => {
  try {
    const result = await MachineData.create({
      DataJson: JSON.stringify(req.query),
    });
    const file = `./download/${process.env.donwloadFIleLink}`;
    res.download(file);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/downloadData/:name", async (req, res) => {
  try {
    const result = await MachineData.create({
      DataJson: JSON.stringify(req.query),
    });

    const file = `./download/${req.params.name}`;
    res.download(file);

    // res.status(200).json({ message: req.params.name });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/postlogin", async (req, res) => {
  try {
    const data = await User.find({
      email: req.body.email,
      password: req.body.password,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// app.post("/postsignup", async (req, res) => {
//   try {
//     const data = await UsersData.create(req.body);
//     res.status(200).json(data);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

app.post("/postsignup", async (req, res) => {
  try {
    const users = await User.create(req.body);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/saveResponse", async (req, res) => {
  try {
    const result = await MachineData2.create({
      DataJson: JSON.stringify(req.body),
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/getResponse", async (req, res) => {
  try {
    const data = await MachineData2.find({});
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/getPostResponse", async (req, res) => {
  try {
    const result = await MachineData2.find({});

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/deletePostResponse", async (req, res) => {
  try {
    const result = await MachineData2.findByIdAndDelete(req.body.id);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./download");
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + "_" + file.originalname);
  },
});

var uploadPostData = multer({ storage: storage }).single("myfile");

app.post("/UploadFiles", async (req, res) => {
  try {
    uploadPostData(req, res, function (err) {
      if (err) {
        return res.end(err);
      }
      const result = UploadFiles.create({
        name: req.body.name,
        link: req.file.filename,
      });
      res.end("File is uploaded successfully!");
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// app.post("/UploadFiles", function (req, res) {
//   uploadPostData(req, res, function (err) {
//     if (err) {
//       return res.end("Error uploading file.");
//     }
//     res.end("File is uploaded successfully!");
//   });
//   const result = await UploadFiles.create(req.body);

//   res.status(200).json(result);
// });

app.get("/getUploadFiles", async (req, res) => {
  try {
    const result = await UploadFiles.find({});

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/deleteUploadFiles", async (req, res) => {
  try {
    const result = await UploadFiles.findByIdAndDelete(req.body.id);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Walnut End
