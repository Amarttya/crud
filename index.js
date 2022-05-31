const express = require("express");
const mysql = require("mysql");
// const expres = require("express");
var app = express();
const bodyparser = require("body-parser");
//const { FLOAT } = require("mysql/lib/protocol/constants/types");

app.use(bodyparser.json());
app.use(express.json());

var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Adi01521307723",
  database: "studentdb",
});

mysqlConnection.connect((err) => {
  if (!err) {
    console.log("Connection established");
  } else {
    console.log(
      "DB connection failed \n Error :" + JSON.stringify(err, undefined, 2)
    );
  }
});

app.get("/student", (req, res) => {
  mysqlConnection.query("SELECT * FROM student", (err, rows, fields) => {
    if (!err) {
      //console.log(rows);
      res.send(rows);
    } else {
      console.log(err);
    }
  });
});

app.get("/student/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id) || id == "#") {
    res.send("Invalid id");
  } else {
    mysqlConnection.query(
      "SELECT * FROM student WHERE id = ?",
      [id],
      (err, rows, fields) => {
        if (!err) {
          //console.log(rows);
          res.send(rows);
        } else {
          console.log(err);
        }
      }
    );
  }
});

app.post("/create", (req, res) => {
  const mysqlQery = (name, address, phone, roll) => {
    mysqlConnection.query(
      "INSERT INTO student (name , address , phone , roll) VALUES (?,?,?,?)",
      [name, address, phone, roll],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("value Inserted");
        }
      }
    );
  }

  const emailValidation = (mail)=> {
    let regx = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if(regx.test(mail) == true){
      res.send("correct mail");
    }else{
      res.send("invalid mail");
    }
  }
    const name = req.body.name;
    const address = req.body.address;
    const phone = parseInt(req.body.phone);
    const roll = parseInt(req.body.roll);
    let email = req.body.email;

    emailValidation(email);
    //const email_ = email.toLowerCase();

    if (!isNaN(name)  || name == null || name.length < 5) {
      res.send("Invalid name");
    }
    else if (!isNaN(address) || address == null || address.length < 5) {
      res.send("Invalid address");
    }
    else if (isNaN(phone) || phone == null) {
      res.send("Invalid phone number");
    }
    else if (isNaN(roll) || roll == null) {
      res.send("Invalid roll number");
    }
    else {
      mysqlQery(name, address, phone, roll);
    }
  }
);

app.delete("/student/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id) ||  id == null) {
    res.send("Invalid id");
  } else {
    mysqlConnection.query(
      "DELETE FROM student WHERE id = ?",
      [id],
      (err, rows, fields) => {
        if (!err) {
          //console.log(rows);
          res.send("DELETED SUCESSFULLY");
        } else {
          console.log(err);
        }
      }
    );
  }
});

app.patch("/student/:id", (req, res) => {
  const name = req.body.name;
  const address = req.body.address;
  const phone = req.body.phone;
  const roll = req.body.roll;
  //mysqlConnection.query(`UPDATE student SET name = ${[name]} , address =${[address]} , phone= ${[phone]}, roll = ${[roll]} WHERE id =${[req.params.id]} ` ,
  mysqlConnection.query(
    `UPDATE student SET name = ? , address =? , phone= ?, roll = ? WHERE id =? `,
    [name, address, phone, roll, req.params.id],
    (err, rows, fields) => {
      if (!err) {
        //console.log(rows);
        res.send("updated SUCESSFULLY");
      } else {
        console.log(err);
      }
    }
  );
});

app.listen(3000, () => console.log("Express server is running on port : 3000"));
