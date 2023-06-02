require('dotenv').config();
const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');

// Database credentials here
const dbSequelize = new Sequelize(
  'postgres://<user>:<password>@<host>:5432/<database_name>'
);

const countries = dbSequelize.define(
  'countries',
  {
    name: { allowNull: false, type: DataTypes.STRING },
    population: { allowNull: false, type: DataTypes.INTEGER },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    schema: 'world',
  }
);

module.exports = {
  countries,
};
