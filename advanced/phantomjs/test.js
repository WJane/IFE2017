

    var page = require('webpage').create();
    page.open('http://yahoo.com', function (status) {
      page.evaluate(function () {
        var el =
          document.querySelector('input[title="Search"]');
        el.value = 'github nightmare';
      }, function (result) {
        page.evaluate(function () {
          var el = document.querySelector('.searchsubmit');
          var event = document.createEvent('MouseEvent');
          event.initEvent('click', true, false);
          el.dispatchEvent(event);
        }, function (result) {
          console.log(result);
          phantom.exit();
        });
      });
    });


