const mysql = require("mysql2");
const { execSync } = require("child_process");
const path = require("path");

const dbOpsPath = `${__dirname}/db/`;
const dbSchema = "schema.sql";
const dbSeeds = "seeds.sql";

function normalizeJoin(dbFile){
    return path.normalize(path.join(dbOpsPath, dbFile)).replace(/\\/g, '/');
};

class dbConnection {
    constructor(username, password, seed=false, rebase=false) {
        try {
            if (rebase) {
                execSync(`mysql -u${username} -p${password} < \"${normalizeJoin(dbSchema)}\"`);
            } else {
                execSync(`mysql -u${username} -p${password}`);
            }
            if (seed) execSync(`mysql -u${username} -p${password} < \"${normalizeJoin(dbSeeds)}\"`);
        } catch (error) {
            console.error("Unable to connect to MySQL DB with these credentials.", error, "\n\nExiting the application...");
            throw new Error(error);
        }
        this.db = mysql.createConnection(
            {
                host: 'localhost',
                user: username,
                password: password,
                database: 'virtual_hr'
            },
            console.log("Attempting to connect to the DB with user: ", username)
        );
    }

    deliverQueryPromise(query, querySettings){
        let queryPromise = new Promise((fulfill, reject) => {
            this.db.query( query, querySettings, (error, data) => {
                if(error){
                    console.error("There was an error processing the query: ",error);
                    return reject(error);
                } else {
                    fulfill(data);
                }
            });
        });
        return queryPromise; 
    }
}

module.exports = dbConnection;
