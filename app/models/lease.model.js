module.exports = (sequelize, Sequelize) => {
  const Lease = sequelize.define("lease", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    dateStart: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    dateEnd: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    amount: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    term: {
      type: Sequelize.ENUM(["monthly", "yearly"]),
      allowNull: false,
    },
  });

  return Lease;
};
