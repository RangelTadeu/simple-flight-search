const haversine = require("haversine");
const findAirport = require("./find-airport");

module.exports = (start, end, unit = "mile") => {
  const getLatLon = (airport) => {
    const { latitude, longitude } = airport;

    return { latitude, longitude };
  };

  const origin = findAirport(start);
  const destiny = findAirport(end);

  const res = haversine(getLatLon(origin), getLatLon(destiny), { unit });

  return res;
};
