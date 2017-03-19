window.onload = function() {
  document.getElementById('btn').onclick = function () {
    search();

  }
}

function search(){
  var val = document.getElementById('key').value;


var payload = {
    key: val
};

var data = new FormData();
data.append( "json", JSON.stringify( payload ) );


  var result = document.getElementById('result');
  fetch('/search?'+val, {
    method: 'POST',
    headers: {'Accept':'application/json','Content-Type': 'application/json'},
    body: data,
    cache: 'default'
  }).then((res) => {
    console.log(res)

  })
  // var request = new Request('/search', {
  //   headers: {'Content-Type': 'application/json'},
  //   method: 'POST',
  //   body:  "firstName=Nikhil&favColor=blue&password=easytoguess"
  //   })
  //   console.log(request.body)
  //   fetch(request).then(resp => resp.json()).then(respjson => {
  //   console.log(respjson)
  // })
}

