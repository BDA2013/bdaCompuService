INSERT INTO department (id, name)
VALUES (01, 'HR'),
       (02, 'Accounting'),
       (03, 'Marketing'),
       (04, 'Sales'),
       (05, 'Customer Service'),
       (06, 'Information Technology')


INSERT INTO roles (id, title, salary, department_id)
VALUES /* HR */
       (001, 'Talent Management', 20000.00, 01),
       (002, 'Training and Development', 15000, 01),
       (003, 'Workplace Safety', 25000, 01),
       /* Accounting */
       (004, 'Chief Financial Officer', 75000.00, 02),
       (005, 'Director of Accounting', 50000.00, 02),
       (006, 'Budgeting', 25000.00, 02),
       /* Marketing */
       (007, 'Chief Marketing Officer', 100000.00, 03),
       (008, 'Director of Marketing', 80000.00, 03),
       (009, "Marketing & promotions manager", 50000.00, 03),
       /* Sales */
       (010, 'Director of Sales', 75000.00, 04),
       (011, 'Sales Management', 70000.00, 04),
       (012, 'Sales Representative', 50000.00, 04),
       /* Information Technology */
       (013, 'IT Technician', 90000.00, 05),
       (014, 'Web Developer', 85000.00, 05),
       (015, 'Computer Programmer', 85000.00, 05)

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
       
