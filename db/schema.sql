DROP DATABASE IF EXISTS compuService_db;
CREATE DATABASE compuService_db;

USE compuService_db;

CREATE TABLE department (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(30)
);

CREATE TABLE roles (
  id INT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  FOREIGN KEY (department_id)
  REFERENCES department(id)
  ON DELETE SET NULL
);

CREATE TABLE employee (
  id INT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT NULL,
  FOREIGN KEY (role_id)
  REFERENCES roles(id),
  FOREIGN KEY (manager_id)
  REFERENCES employee(id)
  ON DELETE SET NULL
);
