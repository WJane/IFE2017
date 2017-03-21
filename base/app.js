'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('babel-polyfill');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tree = function () {
  function Tree(root) {
    _classCallCheck(this, Tree);

    this.root = root;
    this.queue = [];
  }

  _createClass(Tree, [{
    key: 'preOrder',
    value: function preOrder(node) {
      node = node || this.root;
      this.queue.push(node);
      if (node.firstElementChild) {
        this.preOrder(node.firstElementChild);
      }
      if (node.lastElementChild) {
        this.preOrder(node.lastElementChild);
      }
    }
  }, {
    key: 'inOrder',
    value: function inOrder(node) {
      node = node || this.root;
      if (node.firstElementChild) {
        this.inOrder(node.firstElementChild);
      }
      this.queue.push(node);
      if (node.lastElementChild) {
        this.inOrder(node.lastElementChild);
      }
    }
  }, {
    key: 'postOrder',
    value: function postOrder(node) {
      node = node || this.root;
      if (node.firstElementChild) {
        this.postOrder(node.firstElementChild);
      }
      if (node.lastElementChild) {
        this.postOrder(node.lastElementChild);
      }
      this.queue.push(node);
    }
  }, {
    key: 'show',
    value: function show() {
      var _this = this;

      var arr = this.queue;
      // const tasks = []
      // const render = (i) => new Promise((resolve)=>{
      //   setTimeout(()=>{
      //     if(i-1>0){
      //       arr[i-1].style.background = 'white'
      //     }else{
      //       arr[0].style.background = 'white'
      //     }
      //     if(arr[i]){
      //       arr[i].style.background = 'navy'
      //     }

      //     resolve()
      //   }, 200*i)
      // })
      // for(var i=0;i<=arr.length;i++){
      //   tasks.push(render(i))
      // }
      // Promise.all(tasks).then(()=>{
      //   console.log(i)

      // })
      var sleep = function sleep(timeountMS) {
        return new Promise(function (resolve) {
          setTimeout(resolve, timeountMS);
        });
      };

      _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var i;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                i = 0;

              case 1:
                if (!(i <= arr.length)) {
                  _context.next = 9;
                  break;
                }

                _context.next = 4;
                return sleep(200);

              case 4:
                if (i - 1 > 0) {
                  arr[i - 1].style.background = 'white';
                } else {
                  arr[0].style.background = 'white';
                }
                if (arr[i]) {
                  arr[i].style.background = 'navy';
                }

              case 6:
                i++;
                _context.next = 1;
                break;

              case 9:
                _context.next = 11;
                return sleep(200);

              case 11:
                console.log(i);

              case 12:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  }]);

  return Tree;
}();

window.onload = function () {
  var root = document.getElementById('frame');
  document.getElementById('pre').onclick = function () {
    var tree = new Tree(root);
    tree.preOrder(root);
    tree.show();
  };
  document.getElementById('in').onclick = function () {
    var tree = new Tree(root);
    tree.inOrder(root);
    tree.show();
  };
  document.getElementById('post').onclick = function () {
    var tree = new Tree(root);
    tree.postOrder(root);
    tree.show();
  };
};
