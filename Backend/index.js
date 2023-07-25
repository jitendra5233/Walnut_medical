const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const Users = require("./Model/users");
const upload = require("./Service/imageUpload");
const Department = require("./Model/Deparrtment");
const DepartmentPositions = require("./Model/DepartmentPositions");
const DepartmentPositionsCandidate = require("./Model/DepartmentCandidate");
const Expense = require("./Model/expense");
const Enventory = require("./Model/enventory");
const Inventoryitem = require("./Model/inventoryitems");
const LossDamageItem = require("./Model/lossdamage");
const Showrecord = require("./Model/showrecord");
const CandidateDetails = require("./Model/CandidateDetails");
const Candidate_docs = require("./Model/Docs");
const ClientAccount = require("./Model/ClientAccountDetails");
const SocialIcon = require("./Model/ClientScoalMediaIcon");
const ClientAssign = require("./Model/ClientAssignEmpDetails");
const Websetting = require("./Model/Websetting");
const CompanyAccount = require("./Model/CompanyAccount");
const sendMail = require("./controllers/sendMail");
const CandidateDetailsSchema = require("./Model/CandidateDetails");
const moment = require("moment");
const cron = require("node-cron");
const EmployeeSchema = require("./Model/Employee");
const EmployeeExit = require("./Model/Employeeexit");
const EmployeeExitDocs = require("./Model/EmployeeExitDocs");

const singleUpload = upload.single("image");
const docUpload = upload.single("file");

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
          slug: req.body.slug,
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

// app.post("/addDepartmentPostions", async (req, res) => {
//   try {
//     let Positions = DepartmentPositions.create(req.body);
//     res.status(200).json({ Positions });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

app.post("/addDepartmentPostions", async (req, res) => {
  try {
    const users = await DepartmentPositions.create(req.body);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/addNewEmployee", async (req, res) => {
  try {
    if (req.body.ref_id != null) {
      const checkEmp = await EmployeeSchema.find({
        ref_id: req.body.ref_id,
      });

      if (checkEmp.length == 0) {
        const Employee = await EmployeeSchema.create(req.body);
        res.status(200).json(Employee);
      } else {
        res.status(500).json({ message: "Employee Already Exists" });
      }
    } else {
      const Employee = await EmployeeSchema.create(req.body);
      res.status(200).json(Employee);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/getDepartmentPostions", async (req, res) => {
  try {
    const dep = await DepartmentPositions.find({
      ref_id: req.body.id,
      profile_id: req.body.name,
    });
    res.status(200).json(dep);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/getPostionsCandidate", async (req, res) => {
  try {
    const dep = await DepartmentPositionsCandidate.find({
      ref_id: req.body.id,
      profile_id: req.body.name,
    });
    res.status(200).json(dep);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/getHiredCandidate", async (req, res) => {
  try {
    const dep = await DepartmentPositionsCandidate.find({
      hired: true,
    });

    res.status(200).json(dep);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/getRejectedCandidate", async (req, res) => {
  try {
    const dep = await DepartmentPositionsCandidate.find({
      reject: true,
    });
    res.status(200).json(dep);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/getAllEmployee", async (req, res) => {
  try {
    const dep = await EmployeeSchema.find();
    res.status(200).json(dep);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/getAllJobProfiles", async (req, res) => {
  try {
    const dep = await DepartmentPositions.find();
    res.status(200).json(dep);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/addPostionsCandidate", async (req, res) => {
  try {
    singleUpload(req, res, function (err) {
      if (err) {
        res.status(500).json({ message: err.message });
      } else {
        DepartmentPositionsCandidate.create({
          profile_id: req.body.profile_id,
          ref_id: req.body.ref_id,
          f_name: req.body.f_name,
          l_name: req.body.l_name,
          cv: req.file.location,
          candidate_location: req.body.candidate_location,
          email: req.body.email,
          experience: req.body.experience,
          expected_salary: req.body.expected_salary,
          l_salary: req.body.l_salary,
          interview: req.body.interview,
          reject: false,
          hired: false,
        });
        res.status(200).json({ status: true });
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/delete_candidate", async (req, res) => {
  try {
    const { id } = req.body;
    const result = await DepartmentPositionsCandidate.deleteOne({ _id: id });

    res.status(200).json(id);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/addInterviewData", async (req, res) => {
  try {
    const { id, interview_date, interview_time } = req.body;

    const candidate = await DepartmentPositionsCandidate.findByIdAndUpdate(id, {
      interview: true,
      interview_date,
      interview_time,
    });
    if (!candidate) {
      return res
        .status(404)
        .json({ message: `cannot find any product with ID ${id}` });
    } else {
      res.status(200).json(true);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/rejectInterview", async (req, res) => {
  try {
    const { id } = req.body;

    const candidate = await DepartmentPositionsCandidate.findByIdAndUpdate(id, {
      reject: true,
    });

    if (!candidate) {
      return res
        .status(404)
        .json({ message: `cannot find any product with ID ${id}` });
    } else {
      res.status(200).json(true);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/handleHire", async (req, res) => {
  try {
    const { id } = req.body;

    const candidate = await DepartmentPositionsCandidate.findByIdAndUpdate(id, {
      hired: true,
    });

    if (!candidate) {
      return res
        .status(404)
        .json({ message: `cannot find any product with ID ${id}` });
    } else {
      res.status(200).json(true);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/addComment", async (req, res) => {
  try {
    const { id, interviewComment } = req.body;

    const candidate = await DepartmentPositionsCandidate.findByIdAndUpdate(id, {
      rejectComment: interviewComment,
    });

    if (!candidate) {
      return res
        .status(404)
        .json({ message: `cannot find any product with ID ${id}` });
    } else {
      res.status(200).json(true);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/getCandidateDataByIdDetail", async (req, res) => {
  try {
    const can_det_1 = await CandidateDetails.find({
      ref_id: req.body.id,
    });
    // res.status(200).json(can_det_1);
    if (can_det_1 != 0) {
      res.status(200).json(can_det_1);
    } else {
      const can_det_2 = await DepartmentPositionsCandidate.find({
        _id: req.body.id,
      });

      if (can_det_2 != 0) {
        res.status(200).json(can_det_2);
      } else {
        const can_det_3 = await EmployeeSchema.find({
          _id: req.body.id,
        });
        res.status(200).json(can_det_3);
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/getCandidateDataById", async (req, res) => {
  try {
    const can_det_1 = await CandidateDetails.find({
      ref_id: req.body.id,
    });
    // res.status(200).json(can_det_1);
    if (can_det_1 != 0) {
      res.status(200).json(can_det_1);
    } else {
      const can_det_2 = await EmployeeSchema.find({
        ref_id: req.body.id,
      });

      if (can_det_2 != 0) {
        res.status(200).json(can_det_2);
      } else {
        const can_det_3 = await EmployeeSchema.find({
          _id: req.body.id,
        });
        res.status(200).json(can_det_3);
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/getCandidateData2ById", async (req, res) => {
  try {
    const can_det_1 = await DepartmentPositionsCandidate.find({
      ref_id: req.body.id,
    });

    res.status(200).json(can_det_1);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/addCandidateDetails", async (req, res) => {
  try {
    const can_det_1 = await CandidateDetails.find({
      ref_id: req.body.ref_id,
    });

    if (can_det_1 == 0) {
      const dep = await CandidateDetails.create(req.body);
      res.status(200).json(dep);
    } else {
      const dep = await CandidateDetails.findOneAndUpdate(
        { ref_id: req.body.ref_id },
        req.body
      );
      res.status(200).json(dep);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/uploadDocs", async (req, res) => {
  try {
    docUpload(req, res, function (err) {
      if (err) {
        res.status(500).json({ message: err.message });
      } else {
        Candidate_docs.create({
          ref_id: req.body.ref_id,
          name: req.body.name,
          url: req.file.location,
        });
        res.status(200).json({ status: true });
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/getCandidateDocs", async (req, res) => {
  try {
    const docs = await Candidate_docs.find({ ref_id: req.body.id });
    res.status(200).json(docs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/deleteCandidateDocs", async (req, res) => {
  try {
    const { id } = req.body;
    const result = await Candidate_docs.deleteOne({ _id: id });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/getTotalNumberOfEmp", async (req, res) => {
  try {
    const result = await EmployeeSchema.find({});

    res.status(200).json(result.length);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// jitender's code

app.post("/create_expense", async (req, res) => {
  try {
    const expense = await Expense.create(req.body);
    res.status(200).json(expense);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/expense", async (req, res) => {
  try {
    const expnese = await Expense.find({});
    res.status(200).json(expnese);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/getExpense/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Expense.findById({ _id: id });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Define the API route for deletion
app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Expense.deleteOne({ _id: id });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/issued_enventory", async (req, res) => {
  try {
    const enventory = await Enventory.create(req.body);
    const updatedData = await Inventoryitem.findOneAndUpdate(
      { _id: req.body.itemId }, // Filter criteria based on the ID field
      { $inc: { availableItem: -req.body.quantity } }, // Decrement the availableItems field by req.body.quantity
      { new: true } // Set 'new' option to return the updated document
    );

    res.status(200).json({ enventory, updatedData });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/issued", async (req, res) => {
  try {
    const enventory = await Enventory.find({});
    res.status(200).json(enventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/deleteissue_item", async (req, res) => {
  try {
    const { itemId, quantity, itemname } = req.body;
    const result = await Enventory.deleteOne({ _id: itemId });
    const updatedData = await Inventoryitem.findOneAndUpdate(
      { item_name: itemname }, // Filter criteria based on the ID field
      { $inc: { availableItem: quantity } }, // Increment the availableItem field by req.body.quantity
      { new: true } // Set 'new' option to return the updated document
    );
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/add-item", async (req, res) => {
  try {
    const setSuggestedId = req.body.setSuggestedId;
    if (setSuggestedId === 0) {
      const inventoryitem = await Inventoryitem.create(req.body);
      res.status(200).json(inventoryitem);

      const result = await Showrecord.create({
        item_name: req.body.item_name,
        quantity: req.body.quantity,
        item_id: inventoryitem._id,
      });
    } else {
      const {
        item_name,
        availableItem,
        quantity,
        lossDamageItem,
        setSuggestedId,
      } = req.body;

      const result = await Showrecord.create({
        item_name,
        quantity,
        item_id: setSuggestedId,
      });
      const updatedData = await Inventoryitem.findOneAndUpdate(
        { _id: setSuggestedId }, // Filter criteria based on the ID field
        {
          $inc: {
            availableItem: quantity,
            quantity: quantity,
            lossDamageItem: lossDamageItem,
          },
        },
        { new: true } // Set 'new' option to return the updated document
      );

      if (!updatedData) {
        return res.status(404).json({
          message: `Cannot find any product with ID ${setSuggestedId}`,
        });
      }
      res.status(200).json(true);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/getItem", async (req, res) => {
  try {
    const inventoryitem = await Inventoryitem.find({});
    res.status(200).json(inventoryitem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/getItemrecord", async (req, res) => {
  try {
    const inventoryitem = await Showrecord.find({});
    res.status(200).json(inventoryitem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/delete_item/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Inventoryitem.deleteOne({ _id: id });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/update-expense", async (req, res) => {
  try {
    const { id, item_name, paid_amount, quantity, r_getamt, r_paidamt } =
      req.body;
    const result = await Expense.findByIdAndUpdate(id, {
      item_name,
      paid_amount,
      quantity,
      r_getamt,
      r_paidamt,
    });
    if (!result) {
      return res
        .status(404)
        .json({ message: `cannot find any product with ID ${id}` });
    }
    res.status(200).json(true);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/getInventoryItem", async (req, res) => {
  try {
    const { id } = req.body;
    const result = await Inventoryitem.findById({ _id: id });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/update-issueitem", async (req, res) => {
  try {
    const {
      id,
      item_name,
      serial_number,
      quantity,
      emp_name,
      emp_code,
      job_title,
      finalavailableItem,
      item_id,
      assignment_date,
    } = req.body;
    const updatedData = await Inventoryitem.findOneAndUpdate(
      { _id: item_id }, // Filter criteria based on the ID field
      { $inc: { availableItem: -finalavailableItem } }, // Decrement the availableItem field by req.body.quantity
      { new: true } // Set 'new' option to return the updated document
    );
    const result = await Enventory.findByIdAndUpdate(id, {
      serial_number,
      item_name,
      emp_name,
      quantity,
      emp_code,
      job_title,
      assignment_date,
    });

    if (!result) {
      return res
        .status(404)
        .json({ message: `cannot find any product with ID ${id}` });
    }
    res.status(200).json(true);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/update-item", async (req, res) => {
  try {
    const { id, item_name, quantity, availableItem } = req.body;
    const result = await Inventoryitem.findByIdAndUpdate(id, {
      item_name,
      quantity,
      availableItem,
    });
    if (!result) {
      return res
        .status(404)
        .json({ message: `cannot find any product with ID ${id}` });
    }
    res.status(200).json(true);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/getUserData", async (req, res) => {
  try {
    const { userId } = req.body;
    await EmployeeSchema.findOne({ _id: userId }).then(function (doc) {
      res.status(200).json(doc); // Send the found document as the response
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/getItemData", async (req, res) => {
  try {
    const { item_id } = req.body;
    await Inventoryitem.findOne({ _id: item_id }).then(function (doc) {
      res.status(200).json(doc); // Send the found document as the response
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/addToDamage", async (req, res) => {
  try {
    const enventory = await LossDamageItem.create(req.body);
    const item_id = req.body.damageItemId;
    const updatedData = await Inventoryitem.findOneAndUpdate(
      { _id: item_id }, // Filter criteria based on the ID field
      { $inc: { lossDamageItem: req.body.quantity } }, // Decrement the availableItem field by req.body.quantity
      { new: true } // Set 'new' option to return the updated document
    );
    const result = await Enventory.deleteOne({
      serial_number: req.body.serial_number,
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/GetDamageItem", async (req, res) => {
  try {
    const lossDamage = await LossDamageItem.find({});
    res.status(200).json(lossDamage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/available-items/:id", async (req, res) => {
  try {
    const itemId = req.params.id;

    // Query the Inventoryitem collection based on ID
    const getdata = await Enventory.findOne({ _id: itemId });
    const availableItem = await Inventoryitem.findOne({ _id: getdata.item_id });
    res.json({ availableItem: availableItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/getissuedata/:id", async (req, res) => {
  try {
    const itemId = req.params.id;

    // Query the Inventoryitem collection based on ID
    const getdata = await Enventory.findOne({ _id: itemId });
    res.json(getdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/items/search", async (req, res) => {
  try {
    const query = req.query.query;

    // Query the database to search for items matching the query
    const items = await Inventoryitem.find({
      item_name: { $regex: query, $options: "i" },
    });

    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/items/searchName", async (req, res) => {
  try {
    const query = req.query.query;

    // Query the database to search for items matching the query
    const items = await EmployeeSchema.find({
      f_name: { $regex: query, $options: "i" },
    });

    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/items/searchItem", async (req, res) => {
  try {
    const query = req.query.query;

    // Query the database to search for items matching the query
    const items = await Inventoryitem.find({
      item_name: { $regex: query, $options: "i" },
    });

    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// client Module Api here

app.post("/create_clientAccount", async (req, res) => {
  try {
    singleUpload(req, res, function (err) {
      if (err) {
        res.status(500).json({ message: err.message });
      } else {
        ClientAccount.create({
          client_name: req.body.client_name,
          img: req.file.location,
          client_designation: req.body.client_designation,
          project_name: req.body.project_name,
          client_id: req.body.client_id,
          password: req.body.password,
          client_status: req.body.client_status,
        });
        res.status(200).json({ status: true });
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/getAccountDetails", async (req, res) => {
  try {
    const accounts = await ClientAccount.find({ client_status: "new" });
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.get("/getOldAccountDetails", async (req, res) => {
  try {
    const accounts = await ClientAccount.find({ client_status: "old" });
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/update-clientstatus", async (req, res) => {
  try {
    const { id, client_status } = req.body; // Extract id and client_status from the request body

    // Update the client_status to the provided value based on the given id
    const updatedAccount = await ClientAccount.findByIdAndUpdate(
      id,
      { client_status }, // Use the extracted client_status here
      { new: true } // Return the updated document
    );

    res.status(200).json(updatedAccount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/updatetoold-clientstatus", async (req, res) => {
  try {
    const { id, client_status } = req.body;
    const updatedAccount = await ClientAccount.findByIdAndUpdate(
      id,
      { client_status },
      { new: true }
    );

    res.status(200).json(updatedAccount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/update_clientAccount", upload.single("image"), async (req, res) => {
  try {
    const {
      id,
      client_name,
      client_designation,
      project_name,
      client_id,
      password,
      client_status,
    } = req.body;

    if (req.file) {
      const imgLocation = req.file.location;
      await ClientAccount.findByIdAndUpdate(id, {
        client_name,
        client_designation,
        project_name,
        client_id,
        password,
        client_status,
        img: imgLocation,
      });
    } else {
      await ClientAccount.findByIdAndUpdate(id, {
        client_name,
        client_designation,
        project_name,
        client_id,
        password,
        client_status,
      });
    }
    res.status(200).json({ status: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete("/delete_account/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await ClientAccount.deleteOne({ _id: id });

    if (result.deletedCount === 1) {
      await SocialIcon.deleteOne({ client_id: id });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/create_clientSocilaAccount", async (req, res) => {
  try {
    const { icon_name, social_url, password, client_id } = req.body;
    if (!icon_name || !social_url || !password || !client_id) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const socialIcon = await SocialIcon.create({
      icon_name,
      social_url,
      password,
      client_id,
    });

    res.status(200).json(socialIcon);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/getsocialAccountDeatils", async (req, res) => {
  try {
    const Sociladata = await SocialIcon.find({});
    res.status(200).json(Sociladata);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/getsocialmedia/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const socialIcon = await SocialIcon.findOne({ _id: id });
    if (!socialIcon) {
      return res.status(404).json({ message: "SocialIcon not found" });
    }
    res.json(socialIcon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/update-icon", async (req, res) => {
  try {
    const { id, icon_name, social_url, password } = req.body;
    const result = await SocialIcon.findByIdAndUpdate(id, {
      icon_name,
      social_url,
      password,
    });
    if (!result) {
      return res
        .status(404)
        .json({ message: `cannot find any product with ID ${id}` });
    }
    res.status(200).json(true);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.get("/getsocialmediadata/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const socialIcon = await SocialIcon.findOne({ _id: id });
    if (!socialIcon) {
      return res.status(404).json({ message: "SocialIcon not found" });
    }
    res.json(socialIcon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/delete_socialaccount/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await SocialIcon.deleteOne({ _id: id });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/getAcountData", async (req, res) => {
  try {
    const { id } = req.body;
    await ClientAccount.findOne({ _id: id }).then(function (doc) {
      res.status(200).json(doc); // Send the found document as the response
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/assign_employee", async (req, res) => {
  try {
    const {
      client_name,
      client_userId,
      client_password,
      client_projectname,
      emp_name,
      job_title,
      emp_code,
      assignment_date,
      client_id,
    } = req.body;
    const clientAssign = await ClientAssign.create({
      client_name,
      client_userId,
      client_password,
      client_projectname,
      emp_name,
      job_title,
      emp_code,
      assignment_date,
      client_id,
    });
    res.status(200).json(clientAssign);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/getAssignedEmp", async (req, res) => {
  try {
    const result = await ClientAssign.find({});
    res.status(200).json(result);
  } catch {
    res.status(500).json({ message: error.message });
  }
});

app.post("/update_assignmployee", async (req, res) => {
  try {
    const { id, emp_name, assignment_date, emp_code, job_title } = req.body;
    const result = await ClientAssign.findByIdAndUpdate(id, {
      emp_name,
      assignment_date,
      emp_code,
      job_title,
    });
    if (!result) {
      return res
        .status(404)
        .json({ message: `cannot find any product with ID ${id}` });
    }
    res.status(200).json(true);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/delete_assignemployee/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await ClientAssign.deleteOne({ _id: id });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// web setting Api

app.get("/getwebsetting", async (req, res) => {
  try {
    const accounts = await Websetting.find({});
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
      img: imgLocation,
      socialIcons: websetting.socialIcons,
    };

    await Websetting.findByIdAndUpdate(id, updateObject);

    res.status(200).json({ status: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
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

//Company Account Api

app.get("/getCompanyAccount_details", async (req, res) => {
  try {
    const company = await CompanyAccount.find({});
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/add_companyaccount", async (req, res) => {
  try {
    const {
      hosting_name,
      hosting_url,
      services,
      client_name,
      username,
      password,
      renewal_date,
      notification_date,
    } = req.body;

    // Validate input
    if (
      !hosting_name ||
      !hosting_url ||
      !services ||
      !client_name ||
      !username ||
      !password ||
      !renewal_date
    ) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Calculate the notification date if renewal_date is provided and notification_date is not provided
    const calculatedNotificationDate =
      renewal_date && !notification_date
        ? moment(renewal_date).subtract(10, "days").format("YYYY-MM-DD")
        : notification_date;

    const newCompanyAccount = new CompanyAccount({
      hosting_name,
      hosting_url,
      services,
      client_name,
      username,
      password,
      renewal_date,
      notification_date: calculatedNotificationDate,
    });

    // Save the newCompanyAccount to the database
    const result = await newCompanyAccount.save();

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Failed to add company account.",
      error: error.message,
    });
  }
});

app.post("/update-companyaccount", async (req, res) => {
  try {
    const {
      id,
      hosting_name,
      hosting_url,
      services,
      client_name,
      username,
      password,
      renewal_date,
      notification_date,
    } = req.body;

    // Calculate the notification date if renewal_date is provided and notification_date is not provided
    const calculatedNotificationDate =
      renewal_date && !notification_date
        ? moment(renewal_date).subtract(10, "days").format("YYYY-MM-DD")
        : notification_date;

    const updatedData = {
      hosting_name,
      hosting_url,
      services,
      client_name,
      username,
      password,
      renewal_date,
      notification_date: calculatedNotificationDate,
    };

    const result = await CompanyAccount.findByIdAndUpdate(id, updatedData);

    if (!result) {
      return res
        .status(404)
        .json({ message: `cannot find any product with ID ${id}` });
    }
    res.status(200).json(true);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/delete_companyaccount", async (req, res) => {
  try {
    const { id } = req.body;
    const result = await CompanyAccount.deleteOne({ _id: id });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.get("/client/search", async (req, res) => {
  try {
    const query = req.query.query;

    // Query the database to search for items matching the query
    const items = await ClientAccount.find({
      client_name: { $regex: query, $options: "i" },
    });

    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.post("/mail", async (req, res) => {
  try {
    const { hosting_name, hosting_url, renewal_date, client_name } = req.body;

    if (!hosting_name || !hosting_url || !renewal_date || !client_name) {
      // Check if all required fields are present in the request body
      return res.status(400).json({ error: "All fields are required." });
    }

    // Now you have access to the data sent from the client-side
    // You can use this data to send an email using the sendMail function
    await sendMail(
      "Techies Infotech",
      "techies@gmail.com",
      "js0995276@gmail.com",
      hosting_name,
      renewal_date,
      client_name
    );

    // Sending a successful response back to the client
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    // Sending an error response if something goes wrong with sending the email
    res
      .status(500)
      .json({ error: "An error occurred while sending the email." });
  }
});

// Employee Exit Api
app.post("/getcandidatedata", async (req, res) => {
  try {
    const { id } = req.body;
    await CandidateDetailsSchema.findOne({ ref_id: id }).then(function (doc) {
      res.status(200).json(doc); // Send the found document as the response
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/add_employeeexit", async (req, res) => {
  try {
    const employeeExit = await EmployeeExit.create(req.body);
    res.status(200).json(employeeExit);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/GetEmployeeExit", async (req, res) => {
  try {
    const company = await EmployeeExit.find({});
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post(
  "/update_employeeexit",
  upload.array("employee_docs"),
  async (req, res) => {
    try {
      const { id, fnf_status } = req.body;

      if (req.files && req.files.length > 0) {
        const docsLocations = req.files.map((file) => file.location);

        await EmployeeExit.findByIdAndUpdate(id, {
          fnf_status,
          employee_docs: docsLocations,
        });
      } else {
        await EmployeeExit.findByIdAndUpdate(id, {
          fnf_status,
        });
      }

      res.status(200).json({ status: true });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

app.post("/update_employeeexitdocs", async (req, res) => {
  try {
    docUpload(req, res, function (err) {
      if (err) {
        res.status(500).json({ message: err.message });
      } else {
        EmployeeExitDocs.create({
          ref_id: req.body.ref_id,
          name: req.body.name,
          url: req.file.location,
        });
        res.status(200).json({ status: true });
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/deleteemployeeexitDocs", async (req, res) => {
  try {
    const { id } = req.body;
    const result = await EmployeeExitDocs.deleteOne({ _id: id });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/getexitemployeedocs", async (req, res) => {
  try {
    const docs = await EmployeeExitDocs.find({ ref_id: req.body.id });
    res.status(200).json(docs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete("/delete_exitemployeedocs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await EmployeeExitDocs.deleteOne({ _id: id });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
