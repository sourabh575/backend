const express = require('express');
const app = express();
const port = 8080;
const path = require("path");

const methodOverride = require("method-override"); 

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'))

app.get('/test', (req, res) => {
  res.send('Hello, World!');
  console.log("Hello, World!");
});

app.listen(port, () => {
  console.log(`Port is listening on ${port}`);

});
