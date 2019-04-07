'use strict';
module.exports = (sequelize, DataTypes) => {
  const timers = sequelize.define('timers', {
    user_id: DataTypes.INTEGER,
    timer: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  timers.associate = function(models) {
    // associations can be defined here
  };
  return timers;
};