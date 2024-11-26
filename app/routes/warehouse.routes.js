module.exports = (app) => {
  var router = require("express").Router();
  const warehouse = require("../controllers/warehouse.controller.js");

  router.get("/", warehouse.getAll);

  router.post("/", warehouse.create);

  router.put("/:id", warehouse.update);

  router.delete("/:id", warehouse.delete);

  app.use("/databaseSequelize/warehouse", router);
};
