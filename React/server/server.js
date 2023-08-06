const express = require('express');
const cors = require('cors');
const api = require('./routes/NewsData');

const app = express();

app.use(express.static(__dirname));
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use('/api', api);

const port = 3002;
app.listen(port, ()=>{
    console.log(`express is running on ${port}`);
})