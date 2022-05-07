let bases = {
    departments: "departments",
    roles: "roles",
    employees: "employees"
}

const queries = {
    departments: {
        name: bases.departments,
        view: `SELECT ${bases.departments}.id, ${bases.departments}.name as '${bases.departments}' FROM ${bases.departments}`,
        add: `INSERT INTO ${bases.departments} (name) VALUES (?)`,
    },
    roles: {
        name: bases.roles,
        view: `SELECT ${bases.roles}.id, ${bases.roles}.title, ${bases.roles}.salary, ${bases.departments}.name as '${bases.departments}' FROM ${bases.roles} JOIN ${bases.departments} ON ${bases.roles}.department_id = ${bases.departments}.id`,
        add: `INSERT INTO ${bases.roles} (title, salary, department_id) VALUES (?,?,?)`
    },
    employees: {
        name: bases.employees,
        view: `SELECT ${bases.employees}.id, CONCAT(${bases.employees}.first_name, " ",${bases.employees}.last_name) AS 'Employee', ${bases.roles}.title, ${bases.employees}.manager_id from ${bases.employees} JOIN ${bases.roles} on ${bases.employees}.role_id = ${bases.roles}.id`,
        add: `INSERT INTO ${bases.employees} (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`,
        editRole: `UPDATE ${bases.employees} SET role_id=?, manager_id=? WHERE ${bases.employees}.id=?`
    }
};

module.exports = { queries, bases };