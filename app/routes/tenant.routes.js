module.exports = (app) => {
  var router = require("express").Router();
  const tenant = require("../controllers/tenant.controller.js");

  router.get("/", tenant.getAll);

  router.post("/", tenant.create);

  router.put("/:id", tenant.update);

  router.delete("/:id", tenant.delete);

  app.use("/databaseSequelize/tenant", router);
};
