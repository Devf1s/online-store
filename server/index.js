require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./db');
const models = require('./models');
const router = require('./routes');
const fileUpload = require('express-fileupload');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const path = require('path');

const PORT = process.env.PORT || 5000;

const app = express(); // App
app.use(cors()); // Middleware
app.use(express.json()); // Middleware in JSON format
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use('/api', router);
app.use(errorHandler); // Middleware that works with errors should be registered at the end

const start = async () => {
	try {
		await sequelize.authenticate();
		await sequelize.sync();
		app.listen(PORT, () => console.log('Server started on PORT ' + PORT));
	} catch (e) {
		console.log(e);
	}		
} 
start();