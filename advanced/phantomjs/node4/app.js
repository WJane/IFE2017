'use strict';

require('babel-polyfill');

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaPug = require('koa-pug');

var _koaPug2 = _interopRequireDefault(_koaPug);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _task = require('./task.js');

var _task2 = _interopRequireDefault(_task);

var _phantom = require('phantom');

var _phantom2 = _interopRequireDefault(_phantom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var app = new _koa2.default();
var pug = new _koaPug2.default();


// import bodyparser from 'koa-bodyparser'

// app.use(bodyparser())
var result = {};
var baiduSchema = new _mongoose2.default.Schema({
  info: String,
  link: String,
  pic: String,
  title: String
});
var Model = {
  baidu: _mongoose2.default.model('baidu', baiduSchema)
};

_mongoose2.default.connect('mongodb://127.0.0.1/phantom');
var db = _mongoose2.default.connection;

db.on('error', function () {
  console.log('database connection error.');
});

db.once('open', function () {
  console.log('the database has connected.');
});

pug.use(app);

app.use((0, _koaStatic2.default)(__dirname + '/static'));
app.use(function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
    var path;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            path = ctx.request.url;

            if (!(path !== '/')) {
              _context.next = 5;
              break;
            }

            return _context.abrupt('return', next());

          case 5:
            ctx.render('show.pug');

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

app.use(function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(ctx, next) {
    var path, a, key;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:

            //根据url获取关键字真是个烂方法，你以为我想啊！！！！req.body死都取不到数据，真是日了狗了！！
            path = ctx.request.url;
            a = { o: 0 };


            ctx.render('show.pug');

            key = ctx.request.url.split('?')[1];


            ctx.response.status = 200;
            ctx.response.type = 'application/json';
            ctx.body = 'Hello Koa';

          case 7:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

app.listen(3000);
