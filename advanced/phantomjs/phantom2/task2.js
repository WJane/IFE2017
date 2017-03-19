var page = require('webpage').create(),
  system = require('system'),keyword,
  result = {},dataList = [],startTime = Date.now();
phantom.outputEncoding = 'gbk';


//todo: 用es6的promise,es7的async等试试
var config = require('./device.js')
var key = system.args[1];
var device = system.args[2];
var size = config[device];
var agent = config[device].userAgent;

page.viewportSize = size
// page.clipRect = {
//   top: 14,
//   left: 3,
//   width: 400,
//   height: 300
// };

page.settings.userAgent = agent;

page.open('https:www.baidu.com/s?wd=' + key, function(status) {
    if (status !== 'success') {
        console.log('Fail to load address');
    result = {
      'code':0,
      'msg':'抓取失败',
      'word':key,
      'device': device
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
        'word':key,
        'device': device
      };
      result.time = Date.now() - startTime + 'msec';
            result.dataList = dataList;
            console.log(JSON.stringify(result,null,4));
            phantom.exit();
        })



    }
})
