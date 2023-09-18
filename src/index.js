const express = require("express");
const app = express();
const getFlights = require("./get-flights");

app.get("/", async (req, res) => {
  const ret = await getFlights(req.query);

  res.send(ret);
});

app.listen(3000);
