module.exports = (sequelize, Sequelize) => {
  const Tenant = sequelize.define("tenant", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Tenant;
};
