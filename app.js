// creating express app and importing required modules
const express = require("express");
const app = express();
const fs = require("fs"); //file system module allows you to work with the file system on your computer.
const path = require("path"); //Path module provides a way of working with directories and file paths
const bodyParser = require("body-parser"); //in order to read HTTP POST data , we have to use "body-parser" node module.

//selecting the port
const port = 3000;
app.use(bodyParser.urlencoded({ extended: false }));

//giving the path of static files to express
app.use(express.static(path.join(__dirname, "public")));


//Express sever condition
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html")); //serving static Html file
});

app.post("/message", (req, res) => {
  const strSalaryValue = req.body.salaray;
  var currentSalary = parseInt(strSalaryValue);
  fs.writeFileSync("message.txt", strSalaryValue); //sending our from data to text file (optional)
  const stringSalary = fs.readFileSync("message.txt", "utf8"); // reading from text file (optional)
  
  //conditional statements depend upon our problem statement
  if (currentSalary < 1e5) {
    var salaryTax = 0;
    var salaryPercentage= 0;
  } else if (currentSalary >= 1e5 && currentSalary < 2e5) {
    salaryTax = 0.1 * currentSalary;
    salaryPercentage= 0.1 * 100;
  } else if (currentSalary >= 2e5 && currentSalary < 3e5) {
    salaryTax = 0.15 * currentSalary;
    salaryPercentage= 0.15 * 100;
  } else if (currentSalary >= 3e5 && currentSalary < 4e5) {
    salaryTax = 0.2 * currentSalary;
    salaryPercentage= 0.2 * 100;
  } else {
    salaryTax = 0.25 * currentSalary;
    salaryPercentage= 0.25 * 100;
  }

  //sending the response
  res.send("The tax on the person with salary " + currentSalary + " is " + salaryTax+ " Rs which is "+salaryPercentage+"% of the income");
});


//listening the port
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
