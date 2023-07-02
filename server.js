require('dotenv').config()
const cors = require('cors');

const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')

// express app
const app = express()

// cors
app.use(cors({ origin: true, credentials: true}))
app.options("*", cors());

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/user', userRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to db')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 