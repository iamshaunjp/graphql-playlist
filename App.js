const express = require('express');

const app = express();

app.listen(4000, () => {
  console.log('Now listening for requests on port 4000.');
});