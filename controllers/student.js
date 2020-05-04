const { Student } = require('../models');

const register = async (req, res) => {
  const { name, age, phoneNumber } = req.body;
  const newStudent = await Student.create({
    name,
    age: Number(age),
    phoneNumber
  });

  res.status(201).send(newStudent);
};

const getAllStudents = async (req, res) => {
  const students = await Student.findAll();
  res.status(200).send(students);
};

const getStudentById = async (req, res) => {
  const targetId = Number(req.params.id);

  const student = await Student.findOne({
    where: {
      id: targetId
    }
  });

  res.status(200).send(student);
};

const editStudentById = async (req, res) => {
  const targetId = Number(req.params.id);

  const updatedStudent = await Student.update(
    {
      name: req.body.name,
      age: req.body.age,
      phoneNumber: req.body.phoneNumber
    },
    {
      where: {
        id: targetId
      }
    }
  );

  res.status(200).send(updatedStudent);
};

const deleteStudentById = async (req, res) => {
  const targetId = req.params.id;

  await Student.destroy({
    where: {
      id: targetId
    }
  });

  res.status(204).send({ msg: `Student ${targetId} has been deleted` });
};

module.exports = {
  register,
  getAllStudents,
  getStudentById,
  editStudentById,
  deleteStudentById
};
