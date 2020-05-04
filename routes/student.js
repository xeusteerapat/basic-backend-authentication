const express = require('express');
const router = express.Router();
const passport = require('passport');

const {
  register,
  getAllStudents,
  getStudentById,
  editStudentById,
  deleteStudentById
} = require('../controllers/student');

const auth = passport.authenticate('jwt-authentication', { session: false });

router.post('/', register);
router.get('/', getAllStudents);
router.get('/:id', getStudentById);
router.put('/:id', editStudentById);
router.delete('/:id', auth, deleteStudentById);

module.exports = router;
