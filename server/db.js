const Pool = require("pg").Pool;

const pool = new Pool(
    {
        user: "postgres",
        password: "test",
        host: "localhost",
        port: 5432,
        database: "mtissues"
    }
);

module.exports = pool; 
