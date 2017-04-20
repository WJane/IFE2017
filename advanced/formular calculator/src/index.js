(function () {
  const content = document.getElementById('content')
  const count = document.getElementById('count')
  const show = document.getElementById('show')

  //比较元素优先级
  function compare (ele, cur) {
    let temp = {}
    function convert (tar) {
      if (tar == '+' || tar == '-') {
        temp.tar = 0
      } else {
        temp.tar = 1
      }
    }
    temp(ele)
    temp(cur)
    //优先级低于栈顶符号，出栈
    if (temp.ele<temp.cur) {
      return -1
    } else if(temp.ele>temp.cur) {
      return 1
    } else {
      return 0
    }

  }
  count.onclick = function () {
    let current = content.value.trim()
    //优先级规则

    //中缀表达式转化为后缀表达式
    let stack = []
    let suffixExp = ''
    for (let v of current) {
      //若是数字，则进栈
      if (/\d/.exec(v)){
        suffixExp+=v

        //若是符号
      } else {
        let top = stack.pop()   //栈顶元素，出栈
        //是右括号或优先级低于栈顶符号（乘除优先加减）则栈顶元素依次出栈并输出
        while (v==')'||compare(top, v)==-1) {
          suffixExp += top
          stack.unshift(v)
          top = stack.pop()
        }


      }
    }
  }

})();



