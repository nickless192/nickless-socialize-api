const express = require('express');
const mongoose = require('mongoose');

app = express();
const PORT = process.env.PORT || 3001;

// setting up middleware for url encoded, json and to serve static files
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

// enable routes
app.use(require('./routes'));

// connect to mongoose
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/nickless-socialize-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// logs MongoDB statements that are executed
mongoose.set('debug', true);

// listening to port
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));