INSERT INTO department(names)
VALUES ("Engineering"),
       ("Finance"),
       ("Legal"),
       ("Sales") 

INSERT INTO role (id, title, department_id, salary)
VALUES ("Sales Lead", "Sales", 100000),
       ("Salesperson", "Sales", 80000),
       ("Lead Engineer", "Engineering", 150000),
       ("Software Engineer", "Engineering", 120000),
       ("Accountan Manager", "Finance", 160000),
       ("Accountant", "Finance", 125000),
       ("Legal Team Lead", "Legal", 250000)

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", "Sales Lead", 1),
       ("Mike", "Chan", "Salesperson", 1, 1)
       ("Ashley", "Rodriguez", "Lead Engineer", 2),
       ("Kevin", "Tupik", "Software Enineer", 2, 2),
       ("Kunal", "Singh", "Account Manager", 3),
       ("Malia", "Brown", "Accountant", 3, 3), 
       ("Sarah", "Lourd", "Legal Team Lead", 4),
       ("Tom", "Allen", "Lawyer", "Sarah Lourd", 4, 4)