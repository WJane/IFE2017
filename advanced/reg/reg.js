window.onload = function() {
  var textarea = document.getElementById('text');
  var content;
  var show = document.getElementById('show')
  var memory = show.innerHTML
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
  img: /!\[img\]\((.*)\)/
}

function marked(content) {
  var result = ''

  if(exps.head.test(content)){
    var extract = /^\s*(#{1,6})\s*([^\n]+?)\s*#*\s*(?:\n+|$)/.exec(content)
    var count = extract[1].length;
    result += '<h'+count+'>'+extract[2]+'</h'+count+'>'

  }

  if(exps.stalic.test(content)){
    var extract = /\*(.*)\*/gm.exec(content)[1]
    var rep = '<i>'+extract+'</i>'
    var end =  content.replace(/\*(.*)\*/gm, rep)
    result+=end

  }

  if (exps.code.test(content)) {
    var c = /`(.*)`/.exec(content)[1]
    var rep = '<code>'+c+'</code>'
    var end = content.replace(/`(.*)`/g, rep)
    result += end
  }


  if (exps.strong.test(content)) {
    var extract = /\*\*([^*]+?)\*\*/gm.exec(content)[1]
    var rep = '<strong>'+extract+'</strong>'
    var end =  content.replace(/\*\*([^*]+?)\*\*/g, rep)
    result+=end
  }

  if (exps.through.test(content)) {
    var extract = /~~(.*)~~/gm.exec(content)[1]
    var rep = '<del>'+extract+'</del>'
    var end =  content.replace(/~~(.*)~~/gm, rep)
    result+=end
  }

  if(exps.link.test(content)) {
    var extract = /\[(.*)\]\((.*)\)/.exec(content)[1]
    var distress = /\[(.*)\]\((.*)\)/.exec(content)[2]
    var rep = '<a href="'+ distress + '">'+ extract +'</a>'
    var end = content.replace(/\[(.*)\]\((.*)\)/g, rep)
    result += end
  }

  if(exps.img.test(content)) {
    var extract = /!\[img\]\((.*)\)/.exec(content)[1]
    var rep = '<img src="' + extract + '" />'
    var end = content.replace(/!\[img\]\(.*\)/g, rep)
    result+=end
  }
  return result;

  // if(exps.newline.test(content)){
  //   return content+='\n'
  // }




}
