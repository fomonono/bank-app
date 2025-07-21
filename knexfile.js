require("dotenv").config();
module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      port: 5432,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: "bank-app",
    },
    seeds: {
      directory: "./seeds",
    },
  },
};
