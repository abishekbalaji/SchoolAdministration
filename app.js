const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://127.0.0.1:27017/";

const alert = require("alert-node");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Mongoose----------------------------------------
mongoose.connect(
  "mongodb://localhost:27017/studentDB",
  { useNewUrlParser: true },
  { useUnifiedTopology: true }
);
mongoose.set("useFindAndModify", false);
const district = new mongoose.Schema({
  name: String
});

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name should be specified"]
  },
  rollNo: {
    type: Number,
    required: [true, "Roll No. should be specified"]
  },
  className: {
    type: String,
    required: [true, "Class name should be specified"]
  },
  schoolName: {
    type: String,
    required: [true, "School name should be specified"]
  },
  address: {
    type: String,
    required: [true, "Address should be specified"]
  },
  district: {
    type: String,
    required: [true, "District should be specified"]
  },
  attendancePercentage: Number,
  marks: {
    quarterly: {
      maths: Number,
      science: Number,
      socialScience: Number,
      firstLanguage: Number,
      secondLanguage: Number
    },
    halfyearly: {
      maths: Number,
      science: Number,
      socialScience: Number,
      firstLanguage: Number,
      secondLanguage: Number
    },
    annual: {
      maths: Number,
      science: Number,
      socialScience: Number,
      firstLanguage: Number,
      secondLanguage: Number
    }
  }
});

const Student = mongoose.model("students", studentSchema);

const student1 = new Student({
  name: "Student2",
  rollNo: 2,
  className: "I",
  schoolName: "School1",
  address: "Address1",
  district: "North",
  attendancePercentage: 0,
  marks: {
    quarterly: {
      maths: 0,
      science: 0,
      socialScience: 0,
      firstLanguage: 0,
      secondLanguage: 0
    },
    halfyearly: {
      maths: 0,
      science: 0,
      socialScience: 0,
      firstLanguage: 0,
      secondLanguage: 0
    },
    annual: {
      maths: 0,
      science: 0,
      socialScience: 0,
      firstLanguage: 0,
      secondLanguage: 0
    }
  }
});
// student1.save();
const student2 = new Student({
  name: "Student3",
  rollNo: 3,
  className: "I",
  schoolName: "School1",
  address: "Address3",
  district: "North",
  attendancePercentage: 0,
  marks: {
    quarterly: {
      maths: 0,
      science: 0,
      socialScience: 0,
      firstLanguage: 0,
      secondLanguage: 0
    },
    halfyearly: {
      maths: 0,
      science: 0,
      socialScience: 0,
      firstLanguage: 0,
      secondLanguage: 0
    },
    annual: {
      maths: 0,
      science: 0,
      socialScience: 0,
      firstLanguage: 0,
      secondLanguage: 0
    }
  }
});
// student2.save();
const student3 = new Student({
  name: "Student3",
  rollNo: 2,
  className: "III",
  schoolName: "School3",
  address: "Address3",
  district: "East"
});
const student4 = new Student({
  name: "Student4",
  rollNo: 4,
  className: "I",
  schoolName: "School1",
  address: "Address4",
  district: "North",
  attendancePercentage: 0,
  marks: {
    quarterly: {
      maths: 0,
      science: 0,
      socialScience: 0,
      firstLanguage: 0,
      secondLanguage: 0
    },
    halfyearly: {
      maths: 0,
      science: 0,
      socialScience: 0,
      firstLanguage: 0,
      secondLanguage: 0
    },
    annual: {
      maths: 0,
      science: 0,
      socialScience: 0,
      firstLanguage: 0,
      secondLanguage: 0
    }
  }
});

// student4.save();

const student5 = new Student({
  name: "Student3",
  rollNo: 4,
  className: "X",
  schoolName: "School1",
  address: "address5",
  district: "North",
  attendancePercentage: 0,
  marks: {
    quarterly: {
      maths: 0,
      science: 0,
      socialScience: 0,
      firstLanguage: 0,
      secondLanguage: 0
    },
    halfyearly: {
      maths: 0,
      science: 0,
      socialScience: 0,
      firstLanguage: 0,
      secondLanguage: 0
    },
    annual: {
      maths: 0,
      science: 0,
      socialScience: 0,
      firstLanguage: 0,
      secondLanguage: 0
    }
  }
});
// student5.save();

const defaultStudentList = [student1, student2, student3, student4];

Student.find({}, function(err, foundItems) {
  if (foundItems.length === 0) {
    Student.insertMany(defaultStudentList, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Successfully inserted!");
      }
    });
  }
});
// const student5 = new Student({
//   name: "Student3",
//   rollNo: 4,
//   className: "X",
//   schoolName: "School7",
//   address: "address5",
//   district: "North"
// });
// student5.save();

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Class name should be specified"]
  },
  students: [studentSchema]
});

// const Class = mongoose.model("class", classSchema);
// Student.find({ className: "III" }, function(err, foundItems) {
//   const class1 = new Class({
//     name: "X",
//     students: foundItems
//   });
//   class1.save();
// });

// // Student.find({className: "II"}, function(err, foundItems) {
// //   const class1 = new Class({
// //     name: "II",
// //     students: foundItems
// //   });
// //   class1.save();
// // })

const schoolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "School name shhould be specified"]
  },
  district: {
    type: String,
    required: [true, "District name is required!"]
  },
  classes: [classSchema]
});

const School = mongoose.model("schools", schoolSchema);

// Class.find({students: {$elemMatch: {schoolName: "School3", district: "North"}}}, function(err, foundItems){
//   console.log(foundItems);
//   console.log(foundItems[0].students);
//   const school1 = new School({
//     name: "School1",
//     district: "North",
//     classes: foundItems
//   });
//   school1.save();
// });

const districtSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "School name should be specified!"]
  },
  schools: [schoolSchema]
});

// const District = mongoose.model("districts", districtSchema);
// const north = new District({
//   name: "North",
//   schools: [
//     {
//       name: "School1",
//       district: "North",
//       classes: [
//         {
//           name: "I",
//           students: [
//             {
//               name: "Student7",
//               rollNo: 7,
//               className: "I",
//               schoolName: "School1",
//               address: "Address7",
//               district: "North"
//             }
//           ]
//         }
//       ]
//     }
//   ]
// });
// north.save();

// const stateSchema = new mongoose.Schema({
//   district: {
//     type: [districtSchema],
//     required: true
//   }
// });

// const State = mongoose.model("state", districtSchema);

// const state1 = new State({
//   district: [
//     {
//       name: "North",
//       schools: [
//         {
//           name: "School1",
//           district: "North",
//           classes: [
//             {
//               name: "I",
//               students: [
//                 {
//                   name: "Student7",
//                   rollNo: 7,
//                   className: "I",
//                   schoolName: "School1",
//                   address: "Address7",
//                   district: "North"
//                 }
//               ]
//             }
//           ]
//         }
//       ]
//     }
//   ]
// });
// state1.save();

// School.find({district: "North"}, function(err, foundItems) {
//   const north = new District()
// })

// Mongoose end-----------------------------------------------------------

app.listen(3000, function() {
  console.log("Server started");
});

app.get("/", function(req, res) {
  res.render("index");
});

app.post("/districtPage", function(req, res) {
  var listOfSchools = [];
  const clickedBtnValue = req.body.districtBtn;
  Student.find({ district: clickedBtnValue }, function(err, foundItems) {
    foundItems.forEach(function(student) {
      listOfSchools.push(student.schoolName);
    });
    const setOfSchools = new Set(listOfSchools);
    res.render("district", {
      districtName: clickedBtnValue,
      schoolsList: setOfSchools
    });
  });
});

app.post("/schoolPage", function(req, res) {
  var listOfClasses = [];
  const school = req.body.schoolBtn;
  const districtName = req.body.districtName;

  console.log(districtName);
  Student.find({ district: districtName, schoolName: school }, function(
    err,
    foundItems
  ) {
    foundItems.forEach(function(student) {
      listOfClasses.push(student.className);
    });
    listOfClasses.sort();
    const setOfClasses = new Set(listOfClasses);
    res.render("class", {
      schoolName: school,
      classesList: setOfClasses,
      districtName: districtName
    });
  });
});

app.post("/classPage", function(req, res) {
  var listOfStudents = [];
  const districtName = req.body.districtName;
  const schoolName = req.body.schoolName;
  const className = req.body.classBtn;
  Student.find(
    { district: districtName, schoolName: schoolName, className: className },
    function(err, foundItems) {
      foundItems.forEach(function(student) {
        listOfStudents.push({ name: student.name, rollNo: student.rollNo });
      });
      listOfStudents.sort(compare);
      const setOfStudents = new Set(listOfStudents);
      res.render("students", {
        className: className,
        listOfStudents: setOfStudents,
        districtName: districtName,
        schoolName: schoolName
      });
    }
  );
});

app.post("/studentInfoPage", function(req, res) {
  const districtName = req.body.districtName;
  const schoolName = req.body.schoolName;
  const className = req.body.className;
  const studentRollNo = req.body.studentBtn;
  Student.findOne(
    {
      district: districtName,
      schoolName: schoolName,
      className: className,
      rollNo: studentRollNo
    },
    function(err, foundItem) {
      res.render("studentInfo", { studentDocument: foundItem });
    }
  );
});

app.post("/addStudent", function(req, res) {
  const className = req.body.className;
  const schoolName = req.body.schoolName;
  const districtName = req.body.districtName;
  res.render("addStudent", {
    className: className,
    schoolName: schoolName,
    districtName: districtName
  });
});

app.post("/addStudentIntoDB", function(req, res) {
  const name = req.body.name;
  const rollNo = req.body.rollNo;
  const studentClass = req.body.studentClass;
  const school = req.body.school;
  const address = req.body.address;
  const district = req.body.district;

  const studentDoc = new Student({
    name: name,
    rollNo: rollNo,
    className: studentClass,
    schoolName: school,
    address: address,
    district: district,
    attendancePercentage: 0,
    marks: {
      quarterly: {
        maths: 0,
        science: 0,
        socialScience: 0,
        firstLanguage: 0,
        secondLanguage: 0
      },
      halfyearly: {
        maths: 0,
        science: 0,
        socialScience: 0,
        firstLanguage: 0,
        secondLanguage: 0
      },
      annual: {
        maths: 0,
        science: 0,
        socialScience: 0,
        firstLanguage: 0,
        secondLanguage: 0
      }
    }
  });
  studentDoc.save();
  alert.alert("Student added!");
});

function compare(a, b) {
  // Use toUpperCase() to ignore character casing
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();

  let comparison = 0;
  if (nameA > nameB) {
    comparison = 1;
  } else if (nameA < nameB) {
    comparison = -1;
  }
  return comparison;
}

app.post("/deleteStudent", function(req, res) {
  const name = req.body.deleteStuBtn;
  const className = req.body.className;
  const rollNo = req.body.rollNo;
  const schoolName = req.body.schoolName;
  const districtName = req.body.districtName;
  console.log(
    name +
      " " +
      className +
      " " +
      rollNo +
      " " +
      schoolName +
      " " +
      districtName
  );
  Student.deleteOne(
    {
      name: name,
      rollNo: rollNo,
      className: className,
      schoolName: schoolName,
      district: districtName
    },
    function(err) {
      if (err) {
        console.log(err);
        console.log(name);
      } else {
        console.log(name);
      }
    }
  );
  let listOfStudents = [];
  Student.find(
    { district: districtName, schoolName: schoolName, className: className },
    function(err, foundItems) {
      foundItems.forEach(function(student) {
        listOfStudents.push({ name: student.name, rollNo: student.rollNo });
      });
      listOfStudents.sort(compare);
      const setOfStudents = new Set(listOfStudents);
      res.render("students", {
        className: className,
        listOfStudents: setOfStudents,
        districtName: districtName,
        schoolName: schoolName
      });
    }
  );
});

app.post("/editStudent", function(req, res) {
  const name = req.body.editStuBtn;
  const rollNo = req.body.rollNo;
  const className = req.body.className;
  const school = req.body.schoolName;
  const address = req.body.address;
  const district = req.body.districtName;
  console.log(rollNo);
  res.render("editStudent", {
    name: name,
    rollNo: rollNo,
    className: className,
    schoolName: school,
    address: address,
    districtName: district
  });
});

app.post("/updateStudentDB", function(req, res) {
  const newName = req.body.name;
  const newRollNo = req.body.rollNo;
  const newAddress = req.body.address;
  const newClass = req.body.studentClass;
  const oldName = req.body.oldName;
  const oldRollNo = req.body.oldRollNo;
  const oldClass = req.body.oldClass;
  const oldAddress = req.body.oldAddress;
  const district = req.body.district;
  const school = req.body.school;
  console.log(newName);

  Student.findOneAndUpdate(
    {
      name: oldName,
      rollNo: oldRollNo,
      className: oldClass,
      address: oldAddress,
      district: district
    },
    {
      name: newName,
      rollNo: newRollNo,
      className: newClass,
      address: newAddress
    },
    function(err) {}
  );
  Student.findOne(
    {
      district: district,
      schoolName: school,
      className: newClass,
      rollNo: newRollNo
    },
    function(err, foundItem) {
      res.render("studentInfo", { studentDocument: foundItem });
    }
  );
});

app.post("/markEntry", function(req, res) {
  const name = req.body.name;
  const districtName = req.body.districtName;
  const schoolName = req.body.schoolName;
  const className = req.body.className;
  Student.find(
    { district: districtName, schoolName: schoolName, className: className },
    function(err, foundItems) {
      console.log(foundItems);
      res.render("markEntry", { students: foundItems, name: name });
    }
  );
});

app.post("/getMarks", function(req, res) {
  var listOfStudents = []
  console.log(req.body);
  const name = req.body.name;
  const district = req.body.districtName;
  const school = req.body.schoolName;
  const className = req.body.className;
  const maths = req.body.maths.map(Number);
  const science = req.body.science.map(Number);
  const socialScience = req.body.socialScience.map(Number);
  const firstLanguage = req.body.firstLanguage.map(Number);
  const secondLanguage = req.body.secondLanguage.map(Number);
  const attendancePercentage = req.body.attendancePercentage;
  let namesList = req.body.namesList;
  const rollNoList = req.body.rollNoList;
  let addressList = req.body.addressList;
  const districtName = district;
  const schoolName = school;

  console.log(typeof namesList);
  namesList = namesList.split(",");
  addressList = addressList.split(",");
  console.log(namesList);

  console.log(namesList + " " + rollNoList + " " + addressList);

  console.log(typeof maths[0]);
  if (name === "quarterly") {
    console.log("hello world");
  }
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("studentDB");
    var query = {
      district: district,
      schoolName: school,
      className: className
    };
    dbo
      .collection("students")
      .find(query)
      .toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        console.log(result.length);
        // result.forEach(function(student) {
        //   var myquery = student;
        // var newvalues = { $set: {marks: {quarterly: {
        //   maths: maths,
        //   science: science,
        //   socialScience: socialScience,
        //   firstLanguage: firstLanguage,
        //   secondLanguage: secondLanguage
        // }} } };
        for (var i = 0; i < result.length; i++) {
          console.log(i);
          var myquery = result[i];
          var newvalues = {
            $set: {
              marks: {
                quarterly: {
                  maths: maths[i],
                  science: science[i],
                  socialScience: socialScience[i],
                  firstLanguage: firstLanguage[i],
                  secondLanguage: secondLanguage[i]
                }
              }
            }
            // attendancePercentage: attendancePercentage[i]
          };

          dbo
            .collection("students")
            .updateOne(myquery, newvalues, function(err, res) {
              if (err) throw err;
              console.log("1 document updated");
              // db.close();
            });
        }
        for (var i = 0; i < result.length; i++) {
          var mynewquery = result[i];
          var mynewvalues = {
            $set: {
              attendancePercentage: attendancePercentage[i]
            }
          };
          dbo
            .collection("students")
            .updateOne(mynewquery, mynewvalues, function(err, res) {
              if (err) throw err;
              console.log("1 document updated");
              // db.close();
            });
        }
      });
    // db.close();
  });
  Student.find(
    { district: districtName, schoolName: schoolName, className: className },
    function(err, foundItems) {
      foundItems.forEach(function(student) {
        listOfStudents.push({ name: student.name, rollNo: student.rollNo });
      });
      listOfStudents.sort(compare);
      const setOfStudents = new Set(listOfStudents);
      res.render("students", {
        className: className,
        listOfStudents: setOfStudents,
        districtName: districtName,
        schoolName: schoolName
      });
    }
  );
});

