const express = require('express');
const todoController = require('./controllers/todoController');
// building express object
const app = express();

//set up the template engine
app.set('view engine', 'ejs');
// path to static file
app.use(express.static('./public'));

// setting controller
todoController(app);

// listen to port
app.listen(8081);

console.log('Server listening on port 8081');