const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { User } = require('../models');
const { SALT_ROUND, SECRET_KEY } = require('../config/passport.config');

const register = async (req, res) => {
  const { name, username, password } = req.body;

  const user = await User.findOne({
    where: { username }
  });

  if (user) {
    res.status(400).send({
      message: 'Username already taken'
    });
  } else {
    const salt = bcrypt.genSaltSync(Number(SALT_ROUND));
    const hashPassword = bcrypt.hashSync(password, salt);

    await User.create({
      name,
      username,
      password: hashPassword
    });

    res.status(201).send({
      message: 'User created'
    });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({
    where: { username }
  });

  if (!user) {
    res.status(400).send({ message: 'Invalid email or password' });
  } else {
    const isSuccess = bcrypt.compareSync(password, user.password);

    if (isSuccess) {
      const payload = {
        id: user.id,
        name: user.username
      };

      const token = jwt.sign(payload, SECRET_KEY, {
        expiresIn: 3600
      });
      res.status(200).send({ token });
    } else {
      res.status(400).send({ message: 'Invalid email or password' });
    }
  }
};

module.exports = { register, login };
