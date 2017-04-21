(function () {
  const content = document.getElementById('content')
  const count = document.getElementById('count')
  const show = document.getElementById('show')

  count.onclick = function () {
    let current = content.value.trim()
    //9+(3-1)*3+10/2  ==> 9 3 1- 3 * + 10 2 / +
    let arr = []
    //合并数字
    for(let [index,value] of current) {
      if (/\d/.exec(value)) {
        let i = index
        while(/\d/.exec(value[i++])){
          value+=current[i]
          i++
        }
        arr.push(value)
      } else {
        arr.push(value)
      }
    }


    //中缀表达式转化为后缀表达式
    let stack = []
    let suffixExp = ''
    for (let v of current) {
      //若是数字，则输出
      if (/\d/.exec(v)){
        suffixExp+=v
        //若是符号
      } else {
        if(stack.length==0||v=='('){
          stack.push(v)
        }else{
          let top = stack[stack.length-1]
          if(v==")"){
            while(stack.length>0){
              let tmp = stack.pop()
              if(tmp=='('){
                break;
              }else {
                suffixExp+=tmp
              }
            }
          }else if(top=='*'||top=='/'){

            if(v=='*'||v=='/'){

              suffixExp+=v
            }else{
              while(stack.length>0){
                tmp = stack.pop()
                suffixExp+=tmp
              }
              stack.push(v)
            }
          }else{
            stack.push(v)
          }
        }
      }
    }
    while(stack.length>0){
      suffixExp+=stack.pop()
    }

    //后缀表达式计算结果
    let stack1 = []
    for(let v of suffixExp) {
      console.log(v)
    }

  }

})();



