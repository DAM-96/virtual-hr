const express = require("express");
const mysql = require("mysql");

const PORT = process.env.PORT || 3001;
const app = express ();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

class dbConnection {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.db = mysql.createConnection(
            {
                host: 'localhost',
                user: this.username,
                password: this.password,
                database: 'virtual_hr'
            },
            console.log("Successfully connected to the Virtual HR database with user: ", this.username)
        );
    }
}

module.exports = dbConnection;
