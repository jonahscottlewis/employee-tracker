const express = require('express');
const inquirer = require("inquirer");
const mysql = require("mysql2");
// const db = require('./server');
const consoleTables = require("console.table");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
// app.use(express.join());

const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'root',
    database: 'employee_db'
  },
  
);

db.connect(function () {
  console.log(`Connected to the employee_db.`);
  homeMenu();
});

const homeMenu = () => {
  return inquirer.prompt([
    {
      name: 'menu',
      type: 'list',
      message: 'Please make a selection',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update employee role',
        // 'Update employee managers',
        // 'View employee by manager'
        // 'View employees by department',
        // 'Delete dapartments',
        // 'Delete roles',
        // 'Delete employees',
        'Quit'
      ]
    }
  ])
    .then((answer) => {
      switch (answer.menu) {
        case "View all departments":
          viewDepartments();
          break;

        case "View all roles":
          viewRoles();
          break;

        case "View all employees":
          viewEmployees();
          break;

        case "Add a department":
          addDepartment();
          break;

        case "Add a role":
          addRole();
          break;

        case "Add an employee":
          addEmployee();
          break;

        case "Update employee role":
          updateEmployeeRole();
          break;

        // case "Update employee managers":
        //   updateManager();
        //   break;

        // case "View employee by manager":
        //   viewByManager();
        //   break;

        // case "View employees by department":
        //   viewByDepartment();
        //   break;

        // case "Delete dapartments":
        //   deleteDepartment();
        //   break;

        // case "Delete roles":
        //   deleteRoles();
        //   break;

        // case "Delete employees":
        //   deleteEmployee();
        //   break;

        case "Exit":
          quit();
          break;

      }
    });
};

const viewDepartments = () => {
  db.query(`SELECT * FROM department`, (err, results) => {
    if (err) throw err;
    console.log("Departments:");
    console.table(results);
    homeMenu();

  });
};


const viewRoles = () => {
  db.query(`SELECT * FROM role`, (err, results) => {
    if (err) throw err;
    console.log("Roles:");
    console.table(results);
    homeMenu();
      });
};

const viewEmployees = () => {
  db.query(`SELECT * FROM employee`, (err, results) => {
    if (err) throw err;
    console.log("Employees:");
    console.table(results);
    homeMenu();
  });
};

const addDepartment = () => {
  return inquirer.prompt([{

    type: 'input',
    name: 'department',
    message: 'Add new department name',
    validate: newDepartment => {
      if (newDepartment) {
        return true;
      } else {
        console.log("Add new department name");
        return false;
      }
    },
  },
]).then(({ department }) => {
    db.query(`INSERT INTO department(department_name) VALUES(?)`, 
    department,
     function (err, results) {
      if (err) throw err;
      console.log(results);
      console.log("Department added")
      viewDepartments();
    });
  })
};

const addRole = () => {
  return inquirer.prompt([
    {

      type: 'input',
      name: 'title',
      message: 'Add new role title',
      validate: newTitle => {
        if (newTitle) {
          return true;
        } else {
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Add the salary of the role as an integer',
      validate: newSalary => {
        if (newSalary) {
          return true;
        } else {

          return false;
        }
      }
    },
    // Create new role with input
  ]).then(({ title, salary }) => {
    const newRole = [title, salary];

    const departments = [];

    db.query(`SELECT * FROM department`, (err, results) => {
      results.forEach(({ department_name, id }) => {
        departments.push({
          name: department_name,
          value: id
        })
      });

      inquirer
        .prompt([
          {
            type: 'list',
            name: 'department',
            message: 'Assign the role to a department',
            choices: departments

          },

        ]).then(({ department }) => {
          //add input to newly createded role (newRole)
          newRole.push(department);
          //Insert newly created role into db
          db.query(`INSERT INTO role(title, salary, department_id) VALUES (?,?,?)`,
            newRole,
            (err, results) => {
              if (err) throw err;
              console.table(results);
              console.log('Role added');
              viewRoles();
            })
        })



    })
  })
}

const addEmployee = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'Add employee first name',
      validate: firstName => {
        if (firstName) {
          return true;
        } else {
          console.log("Add new role name");
          return false;
        }
      }
    },

    {
      type: 'input',
      name: 'last_name',
      message: 'Add employee last name',
      validate: lastName => {
        if (lastName) {
          return true;
        } else {
          return false;
        }
      }

    },

  ]).then(({ first_name, last_name }) => {
    const newEmployee = [first_name, last_name];

    db.query(`SELECT * FROM role`, (err, results) => {
      if (err) throw err;
      const roles = [];
      results.forEach(({ title, id }) => {
        roles.push({
          name: title,
          value: id
        });
      });
      inquirer.prompt([
        {
          type: 'list',
          name: 'role',
          message: 'Add employee to a role',
          choices: roles
        },
      ]).then(({ role }) => {
        newEmployee.push(role);
        console.log(newEmployee);

        db.query(`SELECT * FROM EMPLOYEE`, (err, results) => {
          if (err) throw err;
          const managers = [
            {
              name: 'none',
              val: null,
            },
          ];
          results.forEach(({ id, first_name, last_name }) => {
            managers.push({
              name: `${first_name} ${last_name}`,
              value: id,
            });
          });
          inquirer.prompt([
            {
              type: 'list',
              name: 'manager',
              message: 'Add manager to add employee to',
              choices: managers,
            }
          ]).then(({ manager }) => {
            newEmployee.push(manager);

            db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?,?,?,?)`,
              newEmployee,
              (err, results) => {
                if (err) throw err;
                console.table(results);
                console.log('Employee added');
                homeMenu();
              })
          })

        })

      })
    });
  })
}

const updateEmployeeRole = () => {
  db.query(`SELECT * FROM employee`, (err, results) => {
    if (err) throw err;
    console.log("Employees:");
    console.table(results);


    homeMenu();
  });
};


// const updateManager = () => {
//   db.query(`UPDATE`)
// }

// const viewByManager = () => {
//   db.query(`UPDATE`)
// }

// const viewByDepartment = () => {
//   db.query(`UPDATE`)
// }


// const deleteDepartment = () => {
//   db.query(`UPDATE`)
// }

// const deleteRoles = () => {
//   db.query(`UPDATE`)
// }

// const deleteEmployee = () => {
//   db.query(`UPDATE`)
// }

function quit() {
  Connection.end
};