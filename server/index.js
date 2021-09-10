const path = require('path');
const express = require('express');
const port = process.env.PORT || 3000;
// const router = require('./routes.js');

const app = express()
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

// app.use('/api', router);

app.listen(port, (err,something) => {
  console.log('Server running on port ' + port);
})

