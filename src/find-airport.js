const airports = require("./files/airports.json");

module.exports = (iata) => airports.find((a) => a.iata === iata);
