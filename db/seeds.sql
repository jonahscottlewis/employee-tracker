INSERT INTO department(department_name)
VALUES ("Engineering"),
       ("Finance"),
       ("Legal"),
       ("Sales"); 

INSERT INTO role (title, department_id, salary)
VALUES ("Sales Lead", 4, 100000),
       ("Salesperson", 4, 80000),
       ("Lead Engineer", 1, 150000),
       ("Software Engineer", 1, 120000),
       ("Accountan Manager", 2, 160000),
       ("Accountant", 2, 125000),
       ("Legal Team Lead", 3, 250000),
       ("Lawyer", 3, 175000);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", "Sales Lead", 1, NULL),
       ("Mike", "Chan", "Salesperson", 2, 1),
       ("Ashley", "Rodriguez", "Lead Engineer", 3, NULL),
       ("Kevin", "Tupik", "Software Enineer", 4, 2),
       ("Kunal", "Singh", "Account Manager", 5, NULL),
       ("Malia", "Brown", "Accountant", 6, 3), 
       ("Sarah", "Lourd", "Legal Team Lead", 6, NULL),
       ("Tom", "Allen", "Lawyer", 7, 4);