const phantom = require('phantom');
phantom.outputEncoding="gbk";

var result = {};
module.exports = crawl;
var _page;
function crawl(key){
var url = 'https://www.baidu.com/s?wd='+key;

phantom.create().then(ph => {
    _ph = ph;
    return _ph.createPage();
}).then(page => {
    _page = page;


    return _page.open(url);
}).then((status) => {
    console.log(status);

    if(status!=='success'){
      result.code=0;
      result.msg='抓取失败'
      return result
    }else{
      _page.evaluate(function() {
          var dataList = [];
          var html = document.querySelectorAll('.result');
          for (var i = 0, l = html.length; i < l; i++) {
            var obj = {};
            var title = html[i].querySelector('.t') || html[i].querySelector('.c-title');
            if (title === null) continue;
            obj.title = title.innerText;
            var info = html[i].querySelector('.c-abstract') || html[i].querySelector('.c-line-clamp3');
            if (info === null) continue;
            obj.info = info.innerText;
            var link = html[i].querySelector('a.c-showurl') || html[i].querySelector('span.c-showurl');
            if (link === null) continue;
            obj.link = link.innerText.trim();
            var pic = html[i].querySelector('.c-img');
            obj.pic = pic ? pic.src : '';
            dataList.push(obj);
          }

          return dataList
      }).then((dl)=>{
          result.code = 1;
          result.msg = '抓取成功';


          result.dataList = dl
          return result

      })

    }
}).then(()=>{
  _ph.exit()
})


}
