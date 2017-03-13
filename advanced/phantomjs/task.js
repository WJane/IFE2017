var page = require('webpage').create(),
  system = require('system'),keyword,
  result = {},dataList = [],startTime = Date.now();
phantom.outputEncoding = 'gbk';
//todo: 用es6的promise,es7的async等试试
var sd = 'sd'
page.open('https:www.baidu.com/s?wd=' + sd, function(status) {
    if (status !== 'success') {
        console.log('Fail to load address');
    result = {
      'code':0,
      'msg':'抓取失败',
      'word':keyword,
    }
        console.log(JSON.stringify(result));
        phantom.exit()
    } else {
        console.log('正在搜索，请稍后..');
        page.includeJs('http//cdn.bootcss.com/jquery/3.1.1/jquery.min.js', function() {
            dataList = page.evaluate(function() {
                var data = [];
                var $content = $('.c-container');
                $content.each(function(index) {
                    data[index] = {
                        title: $(this).find('.t').text() || '',
                        info: $(this).find('.c-abstract').text() || '',
                        link: $(this).find('.c-showurl').text() || '',
                        pic: $(this).find('.c-img').attr('src') || ''
                    };
                })
                return data;
            })
      result = {
        'code':1,
        'msg':'抓取成功',
        'word':keyword,
      };
      result.time = Date.now() - startTime + 'msec';
            result.dataList = dataList;
            console.log(JSON.stringify(result,null,4));
            phantom.exit();
        })



    }
})
