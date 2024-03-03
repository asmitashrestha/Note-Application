const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/notesRoutes');
const app = express();

require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT;

// Define CORS options
const corsOptions = {
  origin: '*', // Change this to your actual frontend URL in production
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());

// Handle preflight requests
app.options('*', cors(corsOptions));

app.use('/api/user', userRoutes);
app.use('/api/note', noteRoutes);

app.listen(PORT, () => {
  console.log(`Server started successfully on port ${PORT}`);
});
