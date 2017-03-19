
var Koa = require('koa')
var Pug = require('koa-pug')
var mongoose = require('mongoose')

var serve = require('koa-static')
var bodyparser = require('koa-bodyparser')

const app = new Koa()
const pug = new Pug()

app.use(bodyparser())

var baiduSchema = new mongoose.Schema({
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


pug.use(app)


app.use(serve(__dirname+'/static'))
app.use((ctx, next) => {


    let path = ctx.request.url
    if(path !== '/'){
      return next();
    }else{
      ctx.render('show.pug')
    }

});

app.use((ctx, next) => {


    let path = ctx.request.url

    if(path !== '/search'){
      ctx.throw(404, 'User not found');
    }else{
      ctx.response = {a:9}
      ctx.render('show.pug')
      console.log(ctx.request.body)
    }
});


app.listen(3000);
