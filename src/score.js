const { differenceInHours } = require("date-fns");
const getDistanceBetweenAirports = require("./distance-airport");

module.exports = (rec, carrierPreference) => {
  const { origin, destination, carrier, departureTime, arrivalTime } = rec;

  const distance = getDistanceBetweenAirports(origin, destination);
  const duration = differenceInHours(
    new Date(arrivalTime),
    new Date(departureTime)
  );

  const carrierFactor = carrier === carrierPreference ? 0.9 : 1;

  return duration * carrierFactor + distance;
};
