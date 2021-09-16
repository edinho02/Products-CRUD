const express = require('express');
const cors = require('cors');
const path = require('path');
const productsRoutes = require('./routes/productsRoutes');

const port = 3033;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/', productsRoutes.routes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.listen(port, () => {
  console.log('Running...');
});
