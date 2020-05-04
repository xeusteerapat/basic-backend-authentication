module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    name: {
      type: DataTypes.STRING(100)
    },
    age: {
      type: DataTypes.INTEGER
    },
    phoneNumber: {
      type: DataTypes.STRING(10)
    }
  });

  return Student;
};
