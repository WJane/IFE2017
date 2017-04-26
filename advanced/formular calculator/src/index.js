(function () {
  const content = document.getElementById('content')
  const count = document.getElementById('count')
  const show = document.getElementById('show')

  count.onclick = function () {
    let current = content.value.trim()
    //9+(3-1)*3+10/2  ==> 9 3 1- 3 * + 10 2 / +
    let arr = []
    for(let v of current) {
      arr.push(v)
    }
    //合并数字
    let pattern = /\d{2}/g   //TODO------->正则不完善
    let reg = /[a-z]{3}\(\d*\)/g //处理三角函数之类
    let tri = reg.exec(current)
    let n = []
    while(tri!=null){
      n.push(tri[0])
      let start = arr.indexOf(tri[0].charAt(0))
      arr.splice(start,tri[0].length,undefined)

      tri=reg.exec(current)
    }
    for(var i=0;i<n.length;i++){
      //sin(89)

      let type = n[i].substring(0,3) //sin
      let num = n[i].substring(n[i].indexOf('(')+1, n[i].length-1) //89
      switch(type){
        case 'sin':
          n[i] = Math.sin(num).toFixed(1).toString()
          break;
        case 'cos':
          n[i] = Math.cos(num).toFixed(1).toString()
          break;
        case 'tan':
          n[i] = Math.tan(num).toFixed(1).toString()
          break;
        default:
          break;
      }


    }
    let cou = 0
    console.log(arr)
    var newa = arr.map((item,index,array)=>{
      if(item==undefined&&n[cou]!==undefined){
        item = n[cou]

        // if(parseFloat(item)<0){
        //   //+
        //   if(arr[index-1]==='+'){
        //     item = -item
        //     //前边符号+变-

        //     //-
        //   }else if(arr[index-1]==='-'){
        //     item = -item
        //     //前边符号-变+

        //     //* / %
        //   }else{
        //     //前边的前边符号
        //     console.log()
        //   }
        // }


        cou++
        return item

      }else{
        return item
      }

    })
    console.log(newa)
    var newaa = newa.filter((item,index,array)=>{
      return (item!==undefined)
    })
    let h = []
    var newstr = newaa.join('')
    let init = pattern.exec(newstr)
    while(init!=null){
      h.push(init)
      init = pattern.exec(newstr)
    }

    for(var i=0;i<h.length;i++){
      var item = h[i]
      var len = item[0].length
      for(var j=item.index;j<len+item.index;j++){
        newaa[j] = undefined
      }
      newaa[item.index] = item[0]
    }

    var filterArr = newaa.filter((item,index,array)=>{
      return (item!== undefined)
    })

    //中缀表达式转化为后缀表达式
    let stack = []
    let suffixExp = []
    for (let v of filterArr) {
      //若是数字，则输出
      if (/\d/.exec(v)){
        suffixExp.push(v)
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
                suffixExp.push(tmp)
              }
            }
          }else if(top=='*'||top=='/'||top=='^'||top=='%'){
            if(v=='*'||v=='/'||top=='^'||top=='%'){
              suffixExp.push(v)
            }else{
              while(stack.length>0){
                tmp = stack.pop()
                suffixExp.push(tmp)
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
      suffixExp.push(stack.pop())
    }
    console.log(suffixExp)
    //9 3 1- 3 * + 10 2 / + ==> 20
    //后缀表达式计算结果
    let stack1 = [], temp1
    for(let v of suffixExp) {
      if(/\d/.exec(v)){
        stack1.push(v)
      }else {
        let one = stack1.pop() //1
        let two = stack1.pop() //3
        switch(v){
          case '+':
            temp1=parseInt(two)+parseInt(one)
            break;
          case '-':
            temp1=two-one
            break;
          case '*':
            temp1=two*one
            break;
          case '/':
            temp1=two/one
            break;
          case '^':
            temp1=Math.pow(two,one)
            break;
          case '%':
            temp1=two%one
            break;
          default:
            break;
        }
        stack1.push(temp1)
      }
    }
    let result = stack1.pop()
    show.innerText = result
  }

})();



