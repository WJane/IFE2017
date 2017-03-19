var http = require('http');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var baiduSchema = new Schema({
  info: String,
  link: String,
  pic: String,
  title: String
})
var Model = {
  baidu: mongoose.model('baidu', baiduSchema)
}
mongoose.connect('mongodb://127.0.0.1/phantom')
var db = mongoose.connection

db.on('error', function() {
  console.log('database connection error.')
})

db.once('open', function() {
  console.log('the database has connected.')
})

http.createServer(function(req,res) {
  console.log('request reveived');
  res.writeHead(200, {'Content-Type': 'test/plain'});
  console.log(res)
  res.end();
}).listen(8000);
console.log('server started!')
