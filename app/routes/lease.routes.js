module.exports = (app) => {
  var router = require("express").Router();
  const lease = require("../controllers/lease.controller.js");

  router.get("/", lease.getAll);

  router.post("/", lease.create);

  router.put("/:id", lease.update);

  router.delete("/:id", lease.delete);

  app.use("/databaseSequelize/lease", router);
};
