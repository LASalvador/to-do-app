var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// connect to databse
mongoose.connect('mongodb+srv://root:123@cluster0-rseib.mongodb.net/test?retryWrites=true&w=majority', {
	useNewUrlParser: true,
})
// Create a schema 
var todoSchema = new mongoose.Schema({
	item: String
});

var Todo = mongoose.model('Todo', todoSchema);
// var itemOne = Todo({item:'Buy flowers'}).save(function(err){
// 	if(err) throw err;
// 	console.log('item saved');
// });

var urlencondedParser = bodyParser.urlencoded({extended: false});
// var data = [{item: 'get milk'}, {item:'walk dog'}, {item:'go to the party with girlfriend'}]

module.exports = function(app){

app.get('/todo', function(req,res){
	// get data from db and pass it to view
	Todo.find({},function(err, data){
		if(err) throw err;
		res.render('todo', {todos: data});
	});
});

app.post('/todo', urlencondedParser ,function(req,res){
	// saving a new todo
	// console.log();
	var newTodo = Todo({item: req.body.item}).save(function(err, data){
		if(err) throw err;
		res.json(data).status(200);
	});
});

app.delete('/todo/:item',function(req,res){
	// delete the request item from mongodb
	Todo.find({item: req.params.item.replace(/\-/g," ")}).remove(function(err,data){
		if(err) throw err;
		res.json(data).status(200);
	});
});

}

