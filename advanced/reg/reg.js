window.onload = function() {
  var textarea = document.getElementById('text');
  var content;
  var show = document.getElementById('show')
  var memory = show.innerHTML
  var ul = document.createElement('ul')
  textarea.oninput = function() {
    content = textarea.value

    show.innerHTML = marked(content)

  }
}

var exps = {
  head:  /^\s*(#{1,6})\s*([^\n]+?)\s*#*\s*(?:\n+|$)/,
  // newline: /.*\n/,
  stalic:  /\*(.*)\*/gm,
  code: /`(.*)`/,
  strong: /\*\*(.*)\*\*/gm,
  through: /~~(.*)~~/gm,
  link: /\[(.*)\]\((.*)\)/,
  img: /!\[img\]\((.*)\)/,
  // pre: /```(.*)```/
  ul: /\-\s\w+\n+/
}

// function test(){
//   var re = /\n*\-\s(\w+|\s+)\n*$/g
//   var r = 0
//   var s = '- sdfsdfs\n- sdfsdfsd\n -sdfsd\n\n- ppp'
//   while(r = re.exec(s)){

//   }
// }

function marked(content) {
  var result = ''

  //斜体
  if(exps.head.test(content)){
    var extract = /^\s*(#{1,6})\s*([^\n]+?)\s*#*\s*(?:\n+|$)/.exec(content)
    var count = extract[1].length;
    result += '<h'+count+'>'+extract[2]+'</h'+count+'>'

  }

  //斜体
  if(exps.stalic.test(content)){
    var extract = /\*(.*)\*/gm.exec(content)[1]
    var rep = '<i>'+extract+'</i>'
    var end =  content.replace(/\*(.*)\*/gm, rep)
    result+=end

  }

  // if (exps.code.test(content)) {
  //   var c = /`(.*)`/.exec(content)[1]
  //   var rep = '<code>'+c+'</code>'
  //   var end = content.replace(/`(.*)`/g, rep)
  //   result += end
  // }


  //加粗
  if (exps.strong.test(content)) {
    var extract = /\*\*([^*]+?)\*\*/gm.exec(content)[1]
    var rep = '<strong>'+extract+'</strong>'
    var end =  content.replace(/\*\*([^*]+?)\*\*/g, rep)
    result+=end
  }

  //删除线
  if (exps.through.test(content)) {
    var extract = /~~(.*)~~/gm.exec(content)[1]
    var rep = '<del>'+extract+'</del>'
    var end =  content.replace(/~~(.*)~~/gm, rep)
    result+=end
  }

  //链接
  if (exps.link.test(content)) {
    var extract = /\[(.*)\]\((.*)\)/.exec(content)[1]
    var distress = /\[(.*)\]\((.*)\)/.exec(content)[2]
    var rep = '<a href="'+ distress + '">'+ extract +'</a>'
    var end = content.replace(/\[(.*)\]\((.*)\)/g, rep)
    result += end
  }

  //图片
  if (exps.img.test(content)) {
    var extract = /!\[img\]\((.*)\)/.exec(content)[1]
    var rep = '<img src="' + extract + '" />'
    var end = content.replace(/!\[img\]\(.*\)/g, rep)
    result+=end
  }

  // if (exps.pre.test(content)) {
  //   var extract = /```(.*)```/.exec(content)[1]
  //   var rep = '<pre>'+extract+'</pre>'
  //   var end = content.replace(/```(.*)```/g, rep)
  //   result += end
  // }

  //无序列表
  if(/\n*\-\s(\w+|\s+)\n*$/.test(content)) {
    var extract = /\n*\-\s(\w+|\s+)\n*$/.exec(content)[1]
    var memory = document.getElementById('show').innerHTML
    var li = '<li>'+extract+'</li>'
    var item = content.replace(/\n*\-\s(\w+|\s+)\n*$/, li)


    result+=item

  }

  //有序列表
  if(/\n*\d\.(\w+|\s+)\n*$/.test(content)) {
    var extract = /\n*\d\.(\w+|\s+)\n*$/.exec(content)[1]
    var memory = document.getElementById('show').innerHTML
    var li = '<li>'+extract+'</li>'
    var item = content.replace(/\n*\d\.(\w+|\s+)\n*$/, li)


    result+=item

  }

  return result;

  // if(exps.newline.test(content)){
  //   return content+='\n'
  // }




}
