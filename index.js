const express = require('express');
const cors = require('cors');
const studentRoutes = require('./routes/student');
const userRoutes = require('./routes/user');
const app = express();

const db = require('./models');

require('./services/passport');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/students', studentRoutes);
app.use('/users', userRoutes);

db.sequelize.sync().then(() => {
  app.listen(8000, () => {
    console.log('Server is running on port 8000 🔥🔥🔥');
  });
});
