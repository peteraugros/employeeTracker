const mysql = require("mysql");
const inquirer = require("inquirer");
const confirm = require('inquirer-confirm');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "employees"
  });

    var showroles;
    var showdepartments;
    var showemployees;
  
connection.connect(function (err) {
  
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    console.log("connected as id " + connection.threadId);
  
    connection.query("SELECT * from role", function (res) {
      showroles = res.map(role => ({ name: role.title, value: role.id }))
    })
    connection.query("SELECT * from department", function (res) {
      showdepartments = res.map(dep => ({ name: dep.name, value: dep.id }))
    })
    connection.query("SELECT * from employee", function (res) {
      showemployees = res.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }))
    })
  
    showMenu();

  })

  function showMenu() {
    inquirer
      .prompt(
        {
          type: "list",
          message: "Welcome to Employee Tracker. What would you like to do?",
          name: "choices",
          choices: [
            {
              name: "View all employees",
              value: "viewEmployees"
            },
            {
              name: "View all departments",
              value: "viewDepartments"
            },
            {
              name: "View all roles",
              value: "viewRoles"
            },
            {
              name: "Add employee",
              value: "addEmployee"
            },
            {
              name: "Add department",
              value: "addDept"
            },
            {
              name: "Add role",
              value: "addRole"
            },
            {
              name: "Update role",
              value: "updateRole"
            },
            {
              name: "Quit",
              value: "quit"
            }
          ]
        }).then(function (res) {
          // console.log(res);
        menu(res.choices)
      })
  }
  