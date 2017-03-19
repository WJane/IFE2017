import 'babel-polyfill'
import Koa from 'koa'
import Pug from 'koa-pug'
import mongoose from 'mongoose'
const app = new Koa()
const pug = new Pug()
import serve from 'koa-static'
import crawl from './task.js'
import phantom from 'phantom'

// import bodyparser from 'koa-bodyparser'

// app.use(bodyparser())
var result = {}
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
app.use(async (ctx, next) => {


    let path = ctx.request.url
    if(path !== '/'){
      return next();
    }else{
      ctx.render('show.pug')

    }

});

app.use(async (ctx, next) => {

    //根据url获取关键字真是个烂方法，你以为我想啊！！！！req.body死都取不到数据，真是日了狗了！！
    let path = ctx.request.url

      var a = {o:0}

      ctx.render('show.pug')

      var key = ctx.request.url.split('?')[1];

      ctx.response.status = 200
      ctx.response.type = 'application/json'
      ctx.body = 'Hello Koa';


});


app.listen(3000);



