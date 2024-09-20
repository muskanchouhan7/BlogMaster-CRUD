const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');

const app = express(); // Ensure app is defined

mongoose.connect('mongodb://localhost:27017/blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Connection error', err);
});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
