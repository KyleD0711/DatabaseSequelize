const db = require("../models");
const Lease = db.lease;

// Get all leases
exports.getAll = (req, res) => {
  Lease.findAll()
    .then((leases) => {
      res.send(leases);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving leases.",
        error: err.message,
      });
    });
};

// Create a new lease
exports.create = (req, res) => {
  const { dateStart, dateEnd, amount, term } = req.body;

  if (!dateStart || !dateEnd || !amount || !term) {
    return res.status(400).send({
      message: "All fields (dateStart, dateEnd, amount, term) are required.",
    });
  }

  Lease.create({ dateStart, dateEnd, amount, term })
    .then((lease) => {
      res.send(lease);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error creating lease.",
        error: err.message,
      });
    });
};

// Update an existing lease
exports.update = (req, res) => {
  const { dateStart, dateEnd, amount, term } = req.body;
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({ message: "Lease ID is required." });
  }

  Lease.update({ ...req.body }, { where: { id } })
    .then(([updated]) => {
      if (updated === 0) {
        res
          .status(404)
          .send({ message: "Lease not found or no changes made." });
      } else {
        res.send({ message: "Lease updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating lease.",
        error: err.message,
      });
    });
};

// Delete a lease
exports.delete = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({ message: "Lease ID is required." });
  }

  Lease.destroy({ where: { id } })
    .then((deleted) => {
      if (deleted) {
        res.send({ message: "Lease deleted successfully." });
      } else {
        res.status(404).send({
          message: "Lease not found or already deleted.",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error deleting lease.",
        error: err.message,
      });
    });
};
