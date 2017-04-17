(function () {
  const content = document.getElementById('content')
  const count = document.getElementById('count')
  const show = document.getElementById('show')
  count.onclick = function () {
    let current = content.value.trim()
    //中缀表达式转化为后缀表达式
    let stack = []
    for (let v of current) {
      if (/[1-9]/.exec(v))
    }
  }

})();
