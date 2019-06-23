const express = require('express');
const todoController = require('./controllers/todoController');
// building express object
const app = express();
var port = 8081
//set up the template engine
app.set('view engine', 'ejs');
// path to static file
app.use(express.static('./public'));

// setting controller
todoController(app);

// listen to port
app.listen(port);

console.log('Server listening on port: ' + port);