module.exports = (sequelize, Sequelize) => {
  const Warehouse = sequelize.define("warehouse", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    squareFootage: {
      type: Sequelize.INTEGER,
    },
    type: {
      type: Sequelize.ENUM(["industrial", "commercial"]),
    },
  });

  return Warehouse;
};
