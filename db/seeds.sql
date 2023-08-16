INSERT INTO department(name)
VALUE ("Logistics"),
    ("Finance"),
    ("Design"),
    ("Legal"),
    ("Clinical"),
    ("Product"),
    ("Admin");

INSERT INTO role(title, salary, department_id)
VALUE ("Warehouse Helper", 20, 1),
        ("Warehouse manager",30, 1),
        ("Accountant", 35, 2),
        ("Product Designer",35, 3 ),
        ("Illustrator",30, 3 ),
        ("Design Lead",50, 3 ),
        ("Lawyer",60, 4 ),
        ("Clinical Analysts Manager",40, 5 ),
        ("Clinical Analyst",30, 5 ),
        ("VP of Clinical Affairs",80, 5 ),
        ("Product Manager",40, 6 ),
        ("Software Engineer",35, 6 ),
        ("Cloud Engineer",35, 6 ),
        ("CTO",80, 6 ),
        ("CEO",100, 7 ),
        ("Executive Secretary",40, 7 );

INSERT INTO employee(first_name, last_name,role_id,manager_id)
VALUES
    ("John", "Doe", 2, NULL),  -- Warehouse manager
    ("Jane", "Smith", 1, 2),    -- Warehouse Helper, managed by John Doe
    ("Michael", "Johnson", 4, 5),  -- Product Designer, managed by Alex Brown
    ("Sara", "Williams", 5, 5),   -- Illustrator, managed by Alex Brown
    ("Alex", "Brown", 6, NULL),      -- Design Lead
    ("Emily", "Davis", 7, NULL),   -- Lawyer
    ("Robert", "Jones", 10, 10),  -- Clinical Analyst Manager, managed by Daniel Wilson
    ("Laura", "Miller", 9, 8),    -- Clinical Analyst, managed by Robert Jones
    ("Daniel", "Wilson", 10, NULL),  -- VP of Clinical Affairs
    ("Grace", "Taylor", 12, 14),  -- Software Engineer,  by Ava Harris
    ("William", "Anderson", 12, 14),  -- Software Engineer, managed  by Ava Harris
    ("Olivia", "Martinez", 11, 14),  -- Product Manager, managed by Ava Harris
    ("Benjamin", "Lopez", 13, 14),  -- Cloud Engineer, by Ava Harris
    ("Ava", "Harris", 14, 15),    -- CTO
    ("Liam", "Clark", 15, NULL),    -- CEO
    ("Sophia", "Lee", 15, 15);      -- Executive Secretary, managed by Liam Clark