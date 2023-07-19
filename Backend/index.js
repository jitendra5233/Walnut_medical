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
const EmployeeSchema = require("./Model/Employee");

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

app.post("/getCandidateDataById", async (req, res) => {
  try {
    const can_det_1 = await EmployeeSchema.find({
      _id: req.body.id,
    });
    res.status(200).json(can_det_1);
    // if (can_det_1 != 0) {
    //   res.status(200).json(can_det_1);
    // } else {
    //   const can_det_2 = await DepartmentPositionsCandidate.find({
    //     _id: req.body.id,
    //   });
    //   res.status(200).json(can_det_2);
    // }
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
    await Users.findOne({ _id: userId }).then(function (doc) {
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
    const items = await Users.find({
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
