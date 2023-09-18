const axios = require("axios");
const { differenceInHours, isWithinInterval } = require("date-fns");
const scoreFlight = require("./score");

const SEARCH_URL =
  "https://gist.githubusercontent.com/bgdavidx/132a9e3b9c70897bc07cfa5ca25747be/raw/8dbbe1db38087fad4a8c8ade48e741d6fad8c872/gistfile1.txt";

module.exports = async (query) => {
  const { startDeparture, endDeparture, maxDuration, preferenceCarrier } =
    query;

  const start = new Date(startDeparture);
  const end = new Date(endDeparture);

  const { data } = await axios.get(SEARCH_URL);

  const filteredFlights = data.filter(
    (f) =>
      differenceInHours(new Date(f.arrivalTime), new Date(f.departureTime)) <=
        maxDuration &&
      isWithinInterval(new Date(f.departureTime), {
        start,
        end,
      })
  );

  const scoredFlights = filteredFlights.map((f) => ({
    score: scoreFlight(f, preferenceCarrier),
    ...f,
  }));

  return scoredFlights.sort((a, b) => a.score - b.score);
};
