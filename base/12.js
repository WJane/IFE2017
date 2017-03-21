
class Tree {
  constructor(root) {
    this.root = root
    this.queue = []
  }

  preOrder(node) {
    node = node||this.root
    this.queue.push(node)
    if(node.firstElementChild) {
      this.preOrder(node.firstElementChild)
    }
    if(node.lastElementChild) {
      this.preOrder(node.lastElementChild)
    }
  }

  inOrder(node) {
    node = node || this.root
    if(node.firstElementChild) {
      this.inOrder(node.firstElementChild)
    }
    this.queue.push(node)
    if(node.lastElementChild) {
      this.inOrder(node.lastElementChild)
    }
  }

  postOrder(node) {
    node = node||this.root
    if(node.firstElementChild) {
      this.postOrder(node.firstElementChild)
    }
    if(node.lastElementChild) {
      this.postOrder(node.lastElementChild)
    }
    this.queue.push(node)
  }

  show() {
    const arr = this.queue
    const tasks = []
    const render = (i) => new Promise((resolve)=>{
      setTimeout(()=>{
        if(i-1>0){
          arr[i-1].style.background = 'white'
        }else{
          arr[0].style.background = 'white'
        }
        if(arr[i]){
          arr[i].style.background = 'navy'
        }

        resolve()
      }, 200*i)
    })
    for(var i=0;i<=arr.length;i++){
      tasks.push(render(i))
    }
    Promise.all(tasks).then(()=>{
      console.log(i)

    })
  }

}

window.onload=function(){
  const root = document.getElementById('frame');
  document.getElementById('pre').onclick=function(){
    var tree = new Tree(root);
    tree.preOrder(root);
    tree.show();

  }
  document.getElementById('in').onclick=function(){
    var tree = new Tree(root);
    tree.inOrder(root);
    tree.show();

  }
  document.getElementById('post').onclick=function(){
    var tree = new Tree(root);
    tree.postOrder(root);
    tree.show();

  }
}
