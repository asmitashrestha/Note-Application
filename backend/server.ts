const express = require('express')
const bodyParser = require('body-parser')
// import cors from 'cors'
import cors from 'cors'
const userRoutes = require('./routes/userRoutes')
const noteRoutes = require('./routes/notesRoutes')
const app = express()

require('dotenv').config()

app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT
app.use(cors())
app.use(express.json())

app.use('/api/user',userRoutes)
app.use('/api/note',noteRoutes)

app.listen(PORT,()=>{
  console.log(`Server started successfully ${PORT}`);
  
})


