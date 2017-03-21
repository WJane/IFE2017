'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
      var arr = this.queue;
      var tasks = [];
      var render = function render(i) {
        return new Promise(function (resolve) {
          setTimeout(function () {
            if (i - 1 > 0) {
              arr[i - 1].style.background = 'white';
            } else {
              arr[0].style.background = 'white';
            }
            if (arr[i]) {
              arr[i].style.background = 'navy';
            }

            resolve();
          }, 200 * i);
        });
      };
      for (var i = 0; i <= arr.length; i++) {
        tasks.push(render(i));
      }
      Promise.all(tasks).then(function () {
        console.log(i);
        // console.log(arr[i])
        // arr[i-1].style.background = 'navy'
      });
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
