const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { User } = require('../models');
const { SALT_ROUND, SECRET_KEY } = require('../config/passport.config');

const register = async (req, res) => {
  const { username, password } = req.body;

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

  const isSuccess = bcrypt.compareSync(password, user.password);

  if (!user || !isSuccess) {
    res.status(401).send({ message: 'Username or password is wrong' });
  } else {
    const payload = {
      id: user.id
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: 3600 });
    res.status(400).send({ token });
  }
};

module.exports = { register, login };
