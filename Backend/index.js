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
 const IMEINumberLQC =require('./Model/IMEINumberLQC');
 const IMEINumberLQCInternalVuales =require("./Model/IMEINumberLQCInternalVuales");

require("dotenv").config();
var multer = require("multer");
const Role = require("./Model/RoleManage");
const LineLogs = require("./Model/LineLogs");
const BatchData = require("./Model/BatchData");

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
app.use("/images", express.static("images"));
app.use('/SoundImages', express.static('testingImages'));
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

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./download");
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + "_" + file.originalname);
  },
});

var storage2 = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./images");
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + "_" + file.originalname);
  },
});

var uploadPostData = multer({ storage: storage }).single("myfile");
var uploadPostData2 = multer({ storage: storage2 }).single("myfile");

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

app.post("/CreateUser", async (req, res) => {
  try {
    uploadPostData2(req, res, function (err) {
      if (err) {
        return res.end(err);
      }
      const result = Users.create({
        f_name: req.body.f_name,
        l_name: req.body.l_name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        image: req.file.filename,
      });
      res.end("File is uploaded successfully!");
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/GetUserList", async (req, res) => {
  try {
    const result = await Users.find({});

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/deleteUser", async (req, res) => {
  try {
    const result = await Users.findByIdAndDelete(req.body.id);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.post("/UpdateUser", async (req, res) => {
  try {
    uploadPostData2(req, res, async function (err) {
      if (req.body.myfile === "false") {
        let user = await Users.findOneAndUpdate(
          { _id: req.body.id },
          {
            f_name: req.body.f_name,
            l_name: req.body.l_name,
            email: req.body.email,
            role: req.body.role,
          }
        );
        res.status(200).json(user);
      } else {
        let user = await Users.findOneAndUpdate(
          { _id: req.body.id },
          {
            f_name: req.body.f_name,
            l_name: req.body.l_name,
            email: req.body.email,
            role: req.body.role,
            image: req.file.filename,
          }
        );
        res.status(200).json(user);
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Role start

app.post("/CreateRole", async (req, res) => {
  try {
    const result = await Role.create(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/getRole", async (req, res) => {
  try {
    const result = await Role.find({});

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/deleteRole", async (req, res) => {
  try {
    const result = await Role.findByIdAndDelete(req.body.id);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/UpdateRole", async (req, res) => {
  try {
    uploadPostData2(req, res, async function (err) {
      let role = await Role.findOneAndUpdate(
        { _id: req.body.id },
        {
          name: req.body.name,
          access: req.body.access,
        }
      );
      res.status(200).json(role);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Role end

// Line Manage

app.post("/LoginLine", async (req, res) => {
  try {
    const result = await LineLogs.create(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/LogoutLine", async (req, res) => {
  try {
    let role = await LineLogs.findOneAndUpdate(
      { _id: req.body.id },
      {
        name: req.body.name,
        LogedOutTime: req.body.time,
        isLogedIn: false,
      }
    );
    res.status(200).json(role);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Line Manage

// Batch Manage
app.post("/saveBatch", async (req, res) => {
  try {
    const result = await BatchData.create(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.post("/getBatch", async (req, res) => {
  try {
    const result = await BatchData.find({
      line_name: req.body.line,
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});




// Batch Manage

// Jitendra API


app.delete('/delete_batch', async (req, res) => {
  try {
    const { batch_id, batch_number, line_name } = req.body;
    const result = await BatchData.deleteOne({ _id: batch_id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Batch not found." });
    }
    const resultRef = await IMEINumberLQCInternalVuales.deleteMany({ batch_number: batch_number, line_name: line_name });
    const resultSecondTbl = await IMEINumberLQC.deleteMany({ batch_number: batch_number, line_name: line_name });
    res.status(200).json({
      message: 'Items deleted successfully',
      deletedBatchCount: result.deletedCount,
      deletedRefCount: resultRef.deletedCount,
      deletedSecondTblCount: resultSecondTbl.deletedCount
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});


app.post("/saveIMEI", async (req, res) => {
  try {
    const { IMEI, line_name, type, batch_number, IMEI_status, Soundboxlinequalitychecklist } = req.body;
    const primaryResult = await IMEINumberLQC.create({
      IMEI,
      line_name,
      type,
      batch_number,
      IMEI_status
    });

    if (primaryResult) {
      const secondaryResult = await IMEINumberLQCInternalVuales.create({
        ref_IMEI: IMEI,
        line_name,
        type,
        batch_number,
        IMEI_status,
        Soundboxlinequalitychecklist
      });

      res.status(200).json(secondaryResult);
    } else {
      res.status(500).json({ message: "Primary table data could not be saved." });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



app.post("/getIMEI", async (req, res) => {
  try {
    const result = await IMEINumberLQC.find({
      batch_number: req.body.batch_number,
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete('/delete_IMEI', async (req, res) => {
  try {
    const { ids, ref_IMEI,batch_number } = req.body;
    const result = await IMEINumberLQC.deleteMany({ _id: { $in: ids } });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Batch not found." });
    }
    const resultRef = await IMEINumberLQCInternalVuales.deleteMany({ ref_IMEI: { $in: ref_IMEI } });

    res.status(200).json({ message: 'Items deleted successfully', result, resultRef });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.post("/saveSoundboxlinequalitychecklist", async (req, res) => {
  try {
    const postData = req.body;
    const { ref_IMEI, batch_number } = postData;
    const existingEntry = await IMEINumberLQCInternalVuales.findOne({
      ref_IMEI,
      batch_number,
    });
    if (existingEntry) {
      await IMEINumberLQCInternalVuales.findOneAndUpdate(
        { ref_IMEI, batch_number },
        postData,
        { new: true } 
      );
    } else {
      const newEntry = new IMEINumberLQCInternalVuales(postData);
      await newEntry.save();
    }
    res.status(200).json({ message: "Table data saved successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error saving table data." });
  }
});


app.get('/getSoundboxlinequalitychecklist', (req, res) => {
  const { IMEINumber } = req.query;

  IMEINumberLQCInternalVuales.find({ ref_IMEI:IMEINumber })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});
app.post("/getBatchList", async (req, res) => {
  try {
    const pipeline = [
      {
        $match: { line_name: req.body.line }, 
      },
      {
        $group: {
          _id: "$batch_number", 
          count: { $sum: 1 }, 
          createdAt: { $first: "$createdAt" },
        },
      },
    ];
    const result = await IMEINumberLQCInternalVuales.aggregate(pipeline);
    const batchCounts = result.map((item) => ({
      BatchID: item._id,
      NumberOfSoundBoxAdded: item.count,
      createdAt:item.createdAt,
    }));

    res.status(200).json(batchCounts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});




app.post("/getIMEIList", async (req, res) => {
  try {
    const postData = req.body;
    const { line, BatchNumber } = postData;

    const existingEntry = await IMEINumberLQCInternalVuales.find({
      line_name: line,
      batch_number: BatchNumber,
    });

    if (existingEntry) {
      res.status(200).json(existingEntry);
    } else {
      res.status(404).json({ message: "Entry not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Error retrieving table data." });
  }
});

var storage3 = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./testingImages");
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + "_" + file.originalname);
  },
});


var uploadTestingImages = multer({ storage: storage3 }).single("image");

app.post("/uploadTestingImages", async (req, res) => {
  try {
    uploadTestingImages(req, res, function (err) {
      if (err) {
        return res.end("err");
      } else {
        res.status(200).json(req.file.filename);
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/getAllDefectedSoundboxlinequalitychecklist', async (req, res) => {
  try {
    const { line_name } = req.query;
    const result = await IMEINumberLQCInternalVuales.find({
      line_name: line_name,
      'Soundboxlinequalitychecklist.status': "NOT OK"
    });
    const filteredResult = result.map(item => ({
      ...item.toObject(),
      Soundboxlinequalitychecklist: item.Soundboxlinequalitychecklist.filter(entry => entry.status === 'NOT OK')
    }));

    res.status(200).json(filteredResult);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/updateData', async (req, res) => {
  try {
    const { Soundboxlinequalitychecklist } = req.body;
    for (const item of Soundboxlinequalitychecklist) {
      await IMEINumberLQCInternalVuales.updateOne(
        { _id: item.id, 'Soundboxlinequalitychecklist.lqcl': item.lqcl },
        {
          $set: {
            'Soundboxlinequalitychecklist.$.status': item.status,
            'Soundboxlinequalitychecklist.$.defect_category': item.defect_category,
            'Soundboxlinequalitychecklist.$.remarks': item.remarks,
            'Soundboxlinequalitychecklist.$.analysis_details': item.analysis_details,

          }
        }
      );
    }

    res.status(200).json({ message: 'Data updated successfully' });
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).json({ error: 'Error updating data' });
  }
});

app.get('/getAllDefectedSoundbox', async (req, res) => {
  try {
    const result = await IMEINumberLQCInternalVuales.find({
      'Soundboxlinequalitychecklist.status': 'NOT OK'
    });
    const filteredResult = result.map(item => ({
      ...item.toObject(),
      Soundboxlinequalitychecklist: item.Soundboxlinequalitychecklist.filter(
        entry => entry.status === 'NOT OK' 
      )
    }));

    res.status(200).json(filteredResult);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
});


app.get('/getAllCheckedSoundboxlist', async (req, res) => {
  try {
    const result = await IMEINumberLQCInternalVuales.find({
      'Soundboxlinequalitychecklist.status': { $in: ["NOT OK", "OK"] }
    });
    const filteredResult = result.map(item => ({
      ...item.toObject(),
      Soundboxlinequalitychecklist: item.Soundboxlinequalitychecklist.filter(entry => entry.analysis_details !== "")
    }));
    res.status(200).json(filteredResult);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: error.message });
  }
});



// Batch Manage

// Walnut End
