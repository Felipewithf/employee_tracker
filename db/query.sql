use employees_db;

-- View all Departments 
SELECT id, name AS departments FROM department;

-- View all Roles with departments
SELECT r.id, r.title AS job_role, r.salary, d.name as department
FROM role AS r
JOIN department AS d 
ON r.department_id = d.id;

-- View all employees
SELECT e.id, e.first_name, e.last_name, r.title, r.salary, d.name as department, ee.first_name as manager_name
FROM employee as e
JOIN role as r
on r.id = e.role_id
JOIN department as d
on d.id = r.department_id
LEFT JOIN employee as ee
on e.manager_id = ee.id;