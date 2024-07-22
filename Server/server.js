const express = require('express');
const cors = require('cors');
require('dotenv').config()
const routes = require('./Routes/routes')



const app = express();
const port = process.env.PORT 

app.use(express.json());

app.use(cors());
app.use(routes)

app.listen(port, () => {
  console.log(`Server is Live on port ${port}`);
});

