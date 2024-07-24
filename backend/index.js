require('dotenv').config()
require("./db");
const express = require('express')
var cors = require('cors')

const app = express()
const port = process.env.PORT || 5000
app.use(cors())

app.use(express.json());  //middleware in order to get value of req.body

//available routes
app.use('/api/auth' , require('./routes/auth'))
app.use('/api/notes' , require('./routes/notes'))

if ( process.env.NODE_ENV == "production"){
  app.use(express.static("client/build"));
}

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
