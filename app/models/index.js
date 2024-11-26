const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.port,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.warehouse = require("./warehouse.model.js")(sequelize, Sequelize);
db.tenant = require("./tenant.model.js")(sequelize, Sequelize);
db.lease = require("./lease.model.js")(sequelize, Sequelize);

db.warehouse.hasMany(
  db.lease,
  { as: "lease" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.lease.belongsTo(
  db.warehouse,
  { as: "warehouse" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.tenant.hasMany(
  db.lease,
  { as: "lease" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.lease.belongsTo(
  db.tenant,
  { as: "tenant" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

module.exports = db;
