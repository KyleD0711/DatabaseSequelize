const db = require("../models");
const Warehouse = db.warehouse;

exports.getAll = async (req, res) => {
  await Warehouse.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500), send(err);
    });
};

exports.create = async (req, res) => {
  const warehouse = {
    squareFootage: req.body.squareFootage,
    type: req.body.type,
  };

  await Warehouse.create(warehouse)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.update = async (req, res) => {
  const warehouse = {
    squareFootage: req.body.squareFootage,
    type: req.body.type,
  };

  await Warehouse.update({ where: { id: req.params.id } }, warehouse)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.delete = async (req, res) => {
  await Warehouse.destroy({ where: { id: req.params.id } })
    .then((data) => {
      if (data > 0) {
        res.send("Warehouse deleted successfully");
      } else {
        res.send(
          "An error occurred while trying to delete this warehouse. Maybe it doesn't exist?"
        );
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
