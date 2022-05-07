USE virtual_hr;
INSERT INTO departments (name)
VALUES ("QA"), ("DevOps"), ("HR"), ("Finance"), ("Sales"), ("Development");

INSERT INTO roles (title, salary, department_id)
VALUES ("SDET", 120000, 1), ("QA Engineer", 130000, 1), ("Manual Tester", 60000, 1), ("Test Lead", 140000, 1), ("QA Manager", 150000, 1),
("DevOps Engineer", 100000, 2), ("DevOps Team Manager", 110000, 2), ("DevOps Inter", 60000, 2),
("Talent Acquisition Agent", 80000, 3), ("Payroll Manager", 100000, 3),
("Head of Finances", 140000, 4), ("Accounting Intern", 60000, 4), ("CFO", 160000, 4),
("Sales assosciate", 90000, 5), ("Sales Intern", 45000, 5), ("Sales Lead", 120000, 5),
("Jr Developer", 80000, 6), ("Sr Developer", 100000, 6), ("Development Lead", 120000, 6), ("Software Architect", 140000, 6), ("CTO", 180000, 6);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Anthony", "Stark", 21, NULL), ("Bruce", "Wayne", 13, NULL), ("James", "Moriarty", 5, NULL), ("James", "Halpert", 16, NULL), ("Michael", "Scott", 10, NULL), ("Lester", "Crest", 7, NULL),
("Bruce", "Banner", 20, 1), ("Peter", "Parker", 19, 1), ("Oscar", "Gomez", 11, 2), ("Kevin", "Malone", 12, 2), ("Tim", "Drake", 11, 2), ("Dwight", "Schrute", 4, 3), ("Ryan", "Woof", 15, 4)
