import 'babel-polyfill'

class MultiTree {
  constructor(root) {
    this.root = root
    this.queue = []
  }

  //深度优先遍历
  deepth(node) {
    if(node) {
      this.queue.push(node);
      for(let i=0;i<node.children.length;i++){
        this.deepth(node.children[i])
      }
    }
  }

  //广度优先遍历

  breadth(node) {
    let current
    let result = []
    if(node) {
      result.push(node)
      current = result.shift()

      while(current){
        this.queue.push(current)
        for(let i=0;i<current.children.length;i++){
          result.push(current.children[i])

        }
        current = result.shift()

      }
    }
  }

  show() {
    const arr = this.queue
    const sleep = (timeountMS) => new Promise((resolve) => {
        setTimeout(resolve, timeountMS);
    });

    (async () => {  // 声明即执行的 async 函数表达式
        for (var i = 0; i <= arr.length; i++) {
            await sleep(200);
            if(i-1>0){
              arr[i-1].style.background = 'white'
            }else{
              arr[0].style.background = 'white'
            }
            if(arr[i]){
              arr[i].style.background = 'navy'
            }
        }

        await sleep(200);
    })();

  }

  search(target, root) {
    this.deepth(root)
    let temp = this.queue
    let results = temp.map((item, index, temp) => {
      // console.log(item.firstChild.nodeValue.trim())
      return item.firstChild.nodeValue.trim()
    })

    let index = results.indexOf(target)

    this.queue = this.queue.slice(0,index+1)

    this.show()

    setTimeout(()=>{
      this.queue[index].style.background = 'navy'
    }, 250*index)

  }
}


window.onload = function () {
  const root = document.getElementById('container')
  const breadth = document.getElementById('breadth')
  const deepth = document.getElementById('deepth')
  const search = document.getElementById('search')

  search.onclick =function() {
    const tree = new MultiTree(tree)
    const target = document.getElementById('target').value
    tree.search(target, root)
  }
  breadth.onclick = function() {

    const tree = new MultiTree(root)
    tree.breadth(root);

    tree.show();
  }

  deepth.onclick = function() {
    const tree = new MultiTree(root)
    tree.deepth(root);
    tree.show();
  }
}
