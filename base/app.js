'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('babel-polyfill');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MultiTree = function () {
  function MultiTree(root) {
    _classCallCheck(this, MultiTree);

    this.root = root;
    this.queue = [];
  }

  //深度优先遍历


  _createClass(MultiTree, [{
    key: 'deepth',
    value: function deepth(node) {
      if (node) {
        this.queue.push(node);
        for (var i = 0; i < node.children.length; i++) {
          this.deepth(node.children[i]);
        }
      }
    }

    //广度优先遍历

  }, {
    key: 'breadth',
    value: function breadth(node) {
      var current = void 0;
      var result = [];
      if (node) {
        result.push(node);
        current = result.shift();

        while (current) {
          this.queue.push(current);
          for (var i = 0; i < current.children.length; i++) {
            result.push(current.children[i]);
          }
          current = result.shift();
        }
      }
    }
  }, {
    key: 'show',
    value: function show() {
      var _this = this;

      var arr = this.queue;
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
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  }, {
    key: 'search',
    value: function search(target, root) {
      var _this2 = this;

      this.deepth(root);
      var temp = this.queue;
      var results = temp.map(function (item, index, temp) {
        // console.log(item.firstChild.nodeValue.trim())
        return item.firstChild.nodeValue.trim();
      });

      var index = results.indexOf(target);

      this.queue = this.queue.slice(0, index + 1);

      this.show();

      if (index == -1) {
        setTimeout(function () {
          alert('没有找到');
        }, 250 * temp.length);
      } else {
        setTimeout(function () {
          _this2.queue[index].style.background = 'navy';
        }, 250 * index);
      }
    }
  }]);

  return MultiTree;
}();

window.onload = function () {
  var root = document.getElementById('container');
  var breadth = document.getElementById('breadth');
  var deepth = document.getElementById('deepth');
  var search = document.getElementById('search');

  search.onclick = function () {
    var tree = new MultiTree(tree);
    var target = document.getElementById('target').value;
    tree.search(target, root);
  };
  breadth.onclick = function () {

    var tree = new MultiTree(root);
    tree.breadth(root);

    tree.show();
  };

  deepth.onclick = function () {
    var tree = new MultiTree(root);
    tree.deepth(root);
    tree.show();
  };
};
