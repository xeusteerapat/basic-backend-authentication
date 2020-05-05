module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING(100)
    },
    password: {
      type: DataTypes.STRING
    },
    name: {
      type: DataTypes.STRING
    }
  });

  return User;
};
