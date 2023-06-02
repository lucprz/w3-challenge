const express = require('express');
const Sequelize = require('sequelize');
const { countries } = require('../database/databaseConnection');

const router = express.Router();

router.get('/', async (req, res) => {
  const searchValue = req.query.value;
  if (!searchValue || searchValue.length < 3) {
    res.sendStatus(204);
    return;
  }

  try {
    const countriesList = await countries.findAll({
      where: {
        name: {
          [Sequelize.Op.iLike]: `%${searchValue}%`,
        },
      },
      limit: 5,
    });

    if (countriesList.length === 0) {
      res.json({ message: 'No countries found' });
      return;
    }

    const totalPopulation = countriesList.reduce(
      (sum, country) => sum + country.population,
      0
    );

    const result = countriesList.map((country) => {
      const percentage = (country.population / totalPopulation) * 100;
      return {
        name: country.name,
        population: country.population,
        percentage: percentage.toFixed(1),
      };
    });

    res.json({ countries: result });
  } catch (error) {
    console.error('Error while searching for countries: ', error);
    res.status(500).json({ message: 'Error while searching for countries' });
  }
});

module.exports = router;
