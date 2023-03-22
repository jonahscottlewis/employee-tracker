const inquirer = require("inquirer");
const express = require('express');
const mysql = require("mysql2");
const consoleTables = require("console.table");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'root',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db.`)
);

function quit() {
  Connection.end
};

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
      switch (answer.homeMenu) {
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
          updateRole();
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
    inquirer.prompt([
      {
        type: 'list',
        name: 'choice',
        message: 'Make a selection',
        choices: [
          'Main Menu',
          'Quit'
        ],
      }
    ])
      .then((answer) => {
        switch (answer.choice) {
          case 'Main Menu':
            homeMenu();
            break;
          case 'Exit':
            quit();
        }
      });

  });
};

const viewRoles = () => {
  db.query(`SELECT * FROM role`, (err, results) => {
    if (err) throw err;
    console.log("Roles:");
    console.table(results);
    inquirer.prompt([
      {
        type: 'list',
        name: 'choice',
        message: 'Make a selection',
        choices: [
          'Main Menu',
          'Quit'
        ],
      }
    ])
      .then((answer) => {
        switch (answer.choice) {
          case 'Main Menu':
            homeMenu();
            break;
          case 'Exit':
            quit();
        }
      });
  });
};

const viewEmployees = () => {
  db.query(`SELECT * FROM employee`, (err, results) => {
    if (err) throw err;
    console.log("Employees:");
    console.table(results);
    inquirer.prompt([
      {
        type: 'list',
        name: 'choice',
        message: 'Make a selection',
        choices: [
          'Main Menu',
          'Quit'
        ],
      }
    ])
      .then((answer) => {
        switch (answer.choice) {
          case 'Main Menu':
            homeMenu();
            break;
          case 'Exit':
            quit();
        }
      });
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
    }
  }]).then((answers) => {
    db.query(`INSERT INTO department (name) VALUES (?)`, 
    [answers.department], (err, results) => {
      if (err) throw err;
      console.log("Added to departments")
      homeMenu();
    });
  })
};

const addRole = () => {
  return inquirer.prompt([{
  {

    type: 'input',
    name: 'title',
    message: 'Add new role title'
  },
  {
    type: 'input',
    name: 'department_id',
    message: 'Add department ID of the new role'
  },
  {
  }
    validate: newRole => {
      if (newRole) {
        return true;
      } else {
        console.log("Add new role name");
        return false;
      }
    }
  }]).then((answers) => {
    db.query(`INSERT INTO role(id, title, department_id, salary) VALUES (?,?,?,?)`, 
    [answers.role], (err, results) => {
      if (err) throw err;
      console.log("Added to roles")
      homeMenu();
    });
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
      inquirer.promt([
        {
          type: 'list',
          name: 'role',
          message: 'Add employee to a role',
          choices: roles
        },
      ]).then(({ role }) => {
        newEmployee.push(role);
        console.log(newEmployee);

        db.query(`SELECT # FROM EMPLOYEE`, (err, results) => {
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
                console.log(results);
                console.log('Employee added');
                inquirer.prompt([
                  {
                    type: 'list',
                    name: 'choice',
                    message: 'Make a selection',
                    choices: [
                      'Main Menu',
                      'Quit'
                    ],
                  }
                ])
                  .then((answer) => {
                    switch (answer.choice) {
                      case 'Main Menu':
                        homeMenu();
                        break;
                      case 'Exit':
                        quit();
                    }
                  });
              })
          })

        })

      })
    });
  })
}

const updateRole = () => {
  db.query(`UPDATE`)
}

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});