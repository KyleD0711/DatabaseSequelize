const db = require("../models");
const Tenant = db.tenant;

// Get all tenants
exports.getAll = (req, res) => {
  Tenant.findAll()
    .then((tenants) => {
      res.send(tenants);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving tenants.",
        error: err.message,
      });
    });
};

// Create a new tenant
exports.create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send({ message: "Tenant name is required." });
  }

  Tenant.create({ name })
    .then((tenant) => {
      res.send(tenant);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error creating tenant.",
        error: err.message,
      });
    });
};

// Update an existing tenant
exports.update = (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  if (!id || !name) {
    return res
      .status(400)
      .send({ message: "Tenant ID and updated name are required." });
  }

  Tenant.update({ name }, { where: { id } })
    .then(([updated]) => {
      if (updated === 0) {
        res
          .status(404)
          .send({ message: "Tenant not found or no changes made." });
      } else {
        res.send({ message: "Tenant updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating tenant.",
        error: err.message,
      });
    });
};

// Delete a tenant
exports.delete = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({ message: "Tenant ID is required." });
  }

  Tenant.destroy({ where: { id } })
    .then((deleted) => {
      if (deleted) {
        res.send({ message: "Tenant deleted successfully." });
      } else {
        res.status(404).send({
          message: "Tenant not found or already deleted.",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error deleting tenant.",
        error: err.message,
      });
    });
};
