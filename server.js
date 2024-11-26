require("dotenv").config();
const express = require("express");

const app = express();
const db = require("./app/models");

db.sequelize.sync({ force: true });

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

require("./app/routes/lease.routes")(app);
require("./app/routes/warehouse.routes")(app);
require("./app/routes/tenant.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3011;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}

module.exports = app;
