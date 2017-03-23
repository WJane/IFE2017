window.onload = function() {
  var textarea = document.getElementById('text');
  var content;
  var show = document.getElementById('show')
  textarea.oninput = function() {
    content = textarea.value

    show.innerHTML = marked(content)
  }
}

var exps = {
  head:  /^\s*(#{1,6})\s*([^\n]+?)\s*#*\s*(?:\n+|$)/,
  newline: /.*\n/,
  stalic:  /\*([^*]+?)\*/gm

}

function marked(content) {
  var result
  console.log(typeof exps.head)
  if(exps.head.test(content)){
    var extract = exps.head.exec(content)
    var count = extract[1].length;
    result = '<h'+count+'>'+extract[2]+'</h'+count+'>'

  }

  if(exps.stalic.test(content)){
    var temp = exps.stalic.exec(content)[1]
    result = '<i>'+temp+'</i>'
    console.log('s')
  }
  console.log(result)
  return result;

  // if(exps.newline.test(content)){
  //   return content+='\n'
  // }




}
