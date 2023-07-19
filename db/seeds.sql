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
       (013, 'Chief of IT', 90000.00, 05),
       (014, 'Web Developer', 85000.00, 05),
       (015, 'Computer Programmer', 85000.00, 05)

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES /* Talent Management */
       (00001, 'Alexander', 'Young', 001),
       /* Training and Development */
       (00002, 'Brandon', 'Alexander', 002),
       (00003, 'Walter', 'Anderson', 002, 00002),
       /* Workplace Safety */
       (00004, 'Walter', 'Stabb', 003),
       (00005, 'Alex', 'Castro', 003, 00004),
       (00006, 'Sophie', 'Loyal', 004, 00004),

       /* Chief Financial Officer */
       (00007, 'Eugine', 'Krabs', 004),
       /* Director of Accounting */
       (00008, 'Sheldon', 'Cooper', 005, 00007),
       /* Budgeting */
       (00009, 'Drew', 'Pickles', 006, 00008),

       /* Chief Marketing Officer */
       (00010, 'Alvin', 'Bridge', 007),
       /* Director of Marketing */
       (00011, 'Stewie', 'Griffin', 008, 00010),
       /* Marketing and Promotional Manager */
       (00012, 'Steve', 'Jobs', 009, 00011),

       /* Director of Sales */
       (00013, 'Ivo', 'Eggman', 010),
       /* Sales of Management */
       (00014, 'Jenny', 'Nate', 011, 00013),
       /* Sales Representative */
       (00015, 'Bob', 'Sanders', 012, 00014),

       /* Chief of IT */
       (00016, 'Christopher', 'Alexander', 013),
       /* Web Developer */
       (00017, 'Kendra', 'Matthew', 014, 00016),
       /* Computer Programmer */
       (00018, 'Andrew', 'Wright', 015, 00016)