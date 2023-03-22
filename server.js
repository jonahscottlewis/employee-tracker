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
        // 'Delete employees'
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


    }
  })
}

const viewDepartments = () => {
  db.query(`SELECT * FROM department`, (err, results) => {
    if(err) throw err;

    console.table(results);
    homeMenu();
  });
};

const viewRoles = () => {
  db.query(`SELECT * FROM role`, (err, results) => {
    if(err) throw err;

    console.table(results);
    homeMenu();
  });
};

const viewEmployees = () => {
  db.query(`SELECT * FROM employee`, (err, results) => {
    if(err) throw err;

    console.table(results);
    homeMenu();
  });
};

const addDepartment = () => {
  db.query(`UPDATE`)
}

const addRole = () => {
  db.query(`UPDATE`)
}

const addEmployee = () => {
  db.query(`UPDATE `)
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






// Delete a movie
app.delete('/api/movie/:id', (req, res) => {
  const sql = `DELETE FROM movies WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Movie not found'
      });
    } else {
      res.json({
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id
      });
    }
  });
});

// Read list of all reviews and associated movie name using LEFT JOIN
app.get('/api/movie-reviews', (req, res) => {
  const sql = `SELECT movies.movie_name AS movie, reviews.review FROM reviews LEFT JOIN movies ON reviews.movie_id = movies.id ORDER BY movies.movie_name;`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// BONUS: Update review name
app.put('/api/review/:id', (req, res) => {
  const sql = `UPDATE reviews SET review = ? WHERE id = ?`;
  const params = [req.body.review, req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Movie not found'
      });
    } else {
      res.json({
        message: 'success',
        data: req.body,
        changes: result.affectedRows
      });
    }
  });
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
