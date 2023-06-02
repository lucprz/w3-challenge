require('dotenv').config();

const { DB_USERNAME } = process.env;
const { DB_PASSWORD } = process.env;
const { DB_DATABASE } = process.env;
const { DB_HOST } = process.env;

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    host: DB_HOST,
    port: '5432',
    dialect: 'postgres',
  },
};
