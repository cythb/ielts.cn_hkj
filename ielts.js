(function() { 

  var host = window.location.host;
  if(host != "ielts.neea.cn"){
    alert("请勿在非ielts.neea.cn激活本黑科技");
    return;
  }
  var https = 'https:' == document.location.protocol ? true : false;
  if(!https){
    alert("请使用ielts.neea.cn的https版本");
    window.location.href="https://ielts.neea.cn/login";
    return;
  }

  var url = window.location.href;
  var url_info = url.match(/myHome\/(\d+)\//);
  var ielts_id = 0;
  try{
    ielts_id = url_info[1];
  }
  catch(e){
    ielts_id = 0;
  }
  if(ielts_id === 0){
    alert("获取报名ID失败，请先登录雅思考试报名网站");
    window.location.href="https://ielts.neea.cn/login";
    return;
  }
  var base_url="https://ielts.neea.cn/myHome/" + ielts_id + "/";

  var show = "<html><head></head><body><div id='test' style='top: 0;right: 0;bottom: 0;left: 0;height: 100%;width: 100%;position: fixed;background-color: #fff;padding-top: 70px;font-family: Helvetica Neue, Helvetica, Arial, \'Microsoft YaHei\';, sans-serif;z-index: 999;overflow-x:hidden;overflow-y:auto;display:block;'><audio id='test_audio'><source src='https://www.onlyke.com/ielts/notice.ogg' type='audio/ogg' style='display:block'></source><source src='https://www.onlyke.com/ielts/notice.mp3' type='audio/mpeg'></source></audio><div class='container'><div class='row'><div class='col-md-12'><div class='page-header'><h1>雅思考试考位检测工具</h1><a href='https://www.onlyke.com/html/593.html' target='_blank'><span class='label label-default'>更多访问：www.onlyke.com</span></a></div></div></div><div class='row' id='process-0' style='display:none;'><div class='col-md-12'><div class='progress progress-striped active'><div class='progress-bar progress-bar-success' role='progressbar' aria-valuenow='0' aria-valuemin='0' aria-valuemax='100' style='width: 100%'>                检测环境中，请稍等...</div></div></div></div><div class='row' id='process-1' style='display:none;'><div class='col-md-12'><div class='alert alert-danger'>              清先登录雅思报名网站</div><a class='btn btn-primary' href='https://ielts.neea.cn/login'>去登陆</a></div></div><div class='row' id='process-2' style='display:none;'><div class='col-md-12'><div class='alert alert-info'>              清选择监控的考试种类</div><button type='button' class='btn btn-info' id='test_normal'>普通考试</button><button type='button' class='btn btn-warning ml-xs' id='test_visa'>用于签证</button></div></div><div class='row' id='process-3' style='display:none;'><div class='col-md-12'><div class='alert alert-info'>              请选择监控的场次，可以使用Ctrl和Shift多选</div><form><div class='form-group'><select multiple='multiple' id='selected_tests'></select><div><div class='form-group'><label>城市</label><select class='form-control' id='city'></select></div><div class='form-group'><label>考试时间</label><select class='form-control' id='date'></select></div></div></div></form><button type='button' class='btn btn-success' id='add_test'>添加</button><button type='button' class='btn btn-success' id='test_start'>开始监听</button></div></div><div class='row' id='process-4' style='display:none;'><div class='col-md-12'><div class='alert alert-info'>              我正在为您持续监控考位，退出请刷新</div><div class='progress progress-striped active' id='table_load'><div class='progress-bar progress-bar-warning' role='progressbar' aria-valuenow='0' aria-valuemin='0' aria-valuemax='100' style='width: 100%'>                正在获取考位...</div></div><div class='progress progress-striped active' id='table_finish' style='display:none;'><div class='progress-bar progress-bar-info' role='progressbar' aria-valuenow='0' aria-valuemin='0' aria-valuemax='100' style='width: 100%'>                稍后将刷新...</div></div><table class='table table-bordered table-striped table-vcenter'><thead><tr><th>城市</th><th>地点</th><th>类别</th><th>考试时间</th><th>状态</th><th>考位提醒</th></tr></thead><tbody id='table_content'></tbody></table></div></div></div></div></body></html>";
  //var show = "<html><head></head><body><div id='test' style='top: 0;right: 0;bottom: 0;left: 0;height: 100%;width: 100%;position: fixed;background-color: #fff;padding-top: 70px;font-family: Helvetica Neue, Helvetica, Arial, \'Microsoft YaHei\';, sans-serif;z-index: 999;overflow-x:hidden;overflow-y:auto;display:block;'><audio id='test_audio'><source src='https://www.onlyke.com/ielts/notice.ogg' type='audio/ogg' style='display:block'></source><source src='https://www.onlyke.com/ielts/notice.mp3' type='audio/mpeg'></source></audio><div class='container'><div class='row'><div class='col-md-12'><div class='page-header'><h1>雅思考试考位检测工具</h1><a href='https://www.onlyke.com/html/593.html' target='_blank'><span class='label label-default'>更多访问：www.onlyke.com</span></a></div></div></div><div class='row' id='process-0' style='display:block;'><div class='col-md-12'><div class='progress progress-striped active'><div class='progress-bar progress-bar-success' role='progressbar' aria-valuenow='0' aria-valuemin='0' aria-valuemax='100' style='width: 100%'>                检测环境中，请稍等...</div></div></div></div><div class='row' id='process-1' style='display:block;'><div class='col-md-12'><div class='alert alert-danger'>              清先登录雅思报名网站</div><a class='btn btn-primary' href='https://ielts.neea.cn/login'>去登陆</a></div></div><div class='row' id='process-2' style='display:block;'><div class='col-md-12'><div class='alert alert-info'>              清选择监控的考试种类</div><button type='button' class='btn btn-info' id='test_normal'>普通考试</button><button type='button' class='btn btn-warning ml-xs' id='test_visa'>用于签证</button></div></div><div class='row' id='process-3' style='display:block;'><div class='col-md-12'><div class='alert alert-info'>              请选择监控的场次，可以使用Ctrl和Shift多选</div><form><div class='form-group'><select multiple='multiple' id='selected_tests'></select><div><div class='form-group'><label>城市</label><select class='form-control' id='city'></select></div><div class='form-group'><label>考试时间</label><select class='form-control' id='date'></select></div></div></div></form><button type='button' class='btn btn-success' id='add_test'>添加</button><button type='button' class='btn btn-success' id='test_start'>开始监听</button></div></div><div class='row' id='process-4' style='display:block;'><div class='col-md-12'><div class='alert alert-info'>              我正在为您持续监控考位，退出请刷新</div><div class='progress progress-striped active' id='table_load'><div class='progress-bar progress-bar-warning' role='progressbar' aria-valuenow='0' aria-valuemin='0' aria-valuemax='100' style='width: 100%'>                正在获取考位...</div></div><div class='progress progress-striped active' id='table_finish' style='display:block;'><div class='progress-bar progress-bar-info' role='progressbar' aria-valuenow='0' aria-valuemin='0' aria-valuemax='100' style='width: 100%'>                稍后将刷新...</div></div><table class='table table-bordered table-striped table-vcenter'><thead><tr><th>城市</th><th>地点</th><th>类别</th><th>考试时间</th><th>状态</th><th>考位提醒</th></tr></thead><tbody id='table_content'></tbody></table></div></div></div></div></body></html>";

  var script = '<script src="//cdn.bootcss.com/bootstrap/3.3.6/js/bootstrap.min.js"></script><link href="//cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet"><style type="text/css">.m-none{margin:0!important}.m-auto{margin:0 auto!important}.m-xs{margin:5px!important}.m-sm{margin:10px!important}.m-md{margin:15px!important}.m-lg{margin:20px!important}.m-xl{margin:25px!important}.m-xlg{margin:30px!important}.mt-none{margin-top:0!important}.mt-xs{margin-top:5px!important}.mt-sm{margin-top:10px!important}.mt-md{margin-top:15px!important}.mt-lg{margin-top:20px!important}.mt-xl{margin-top:25px!important}.mt-xlg{margin-top:30px!important}.mb-none{margin-bottom:0!important}.mb-xs{margin-bottom:5px!important}.mb-sm{margin-bottom:10px!important}.mb-md{margin-bottom:15px!important}.mb-lg{margin-bottom:20px!important}.mb-xl{margin-bottom:25px!important}.mb-xlg{margin-bottom:30px!important}.mr-none{margin-left:0!important}.ml-xs{margin-left:5px!important}.ml-sm{margin-left:10px!important}.ml-md{margin-left:15px!important}.ml-lg{margin-left:20px!important}.ml-xl{margin-left:25px!important}.ml-xlg{margin-left:30px!important}.mr-none{margin-right:0!important}.mr-xs{margin-right:5px!important}.mr-sm{margin-right:10px!important}.mr-md{margin-right:15px!important}.mr-lg{margin-right:20px!important}.mr-xl{margin-right:25px!important}.mr-xlg{margin-right:30px!important}.table.table-vcenter th,.table.table-vcenter td {vertical-align: middle;}</style>';

  $("body").css("overflow-y","hidden");

  var product = "IELTSPBT";
  //var city = ['320100'];
  //var date = ['2022-08-20', '2022-08-27'];
  var city = {'name': '', 'code': ''};
  var date = '';
  var select = [];
  var ajax_count = 0;
  var notice = [];

  init();

  function init(){
    $("head link").remove();
    $("head").append(script);
    $("body").append(show);

    setTimeout(function() {
      $("#test").fadeIn('slow', function() {
        checkLogin();
      });
      },1000);

    $("#test_normal").click(function(event) {
      product = "IELTSPBT";
      test_setting();
    });
    $("#test_visa").click(function(event) {
      product = "IELTSUKVI";
      test_setting();
    });
    $("#test_start").click(function(event) {
      Notification.requestPermission();
      test_start();
    });
    $("#table_content").on('click', '.test_notice', function(event) {
      var checked = $(this).is(':checked');
      var id = $(this).val();
      if(checked){
        notice.push(id);
      }else{
        notice.splice($.inArray(id,notice),1);	
      }
      console.log(notice);
    });

    $("#city").change(function(event) {
      select_city();
    });

    $("#date").change(function(event) {
      select_date();
    });

    $("#add_test").click(function(event) {
      add_test();
    });
  }

  function checkLogin(){
    $.ajax({
      cache: false,
      url: base_url + 'showProfile',
      type: 'GET',
      dataType:'text',
      //async: false,
      error: function(request) {
        alert("登录检测失败，请刷新本网页");
      },
      success: function(data) {
        var find = data.indexOf("无效的会话");
        if(find > -1){
          needLogin();
        }else{
          test_choose();
        }
      }
    });
  }

  function needLogin(){
    $("#process-0").hide();
    $("#process-1").show();
  }

  function test_choose(){
    $("#process-0").hide();
    $("#process-2").show();
  }

  function test_setting(){
    var a = "cn";
    $.getJSON("getTestCenterProvinceCity", {
      productCode: product
    }, function(d) {
        $.each(d, function(e, f) {
          var g = $("<optgroup>");
          if (a == "cn") {
            g.attr("label", f.provinceNameCn)
          } else {
            g.attr("label", f.provinceNameEn)
          }
          $.each(f.cities, function(j, i) {
            var city_name = f.provinceNameCn + '-' + i.cityNameCn;
            var city_value  = i.cityCode;
            $('#city').append('<option value="' + city_value + ':' + city_name + '">' + city_name + '</option>');
          });
        });

        $("#process-2").hide();
        $("#process-3").show();
      })
  }

  function select_city() {
    queryTestDayByCity();
    var value = $('#city').val();
    var items = value.split(':');
    var name = items[1];
    var code = items[0];
    city = { name, code};
    console.log(this.city);
    queryTestDayByCity('cn', product, code);
  }

  function select_date() {
    date = $('#date').val();
    console.log(this.date);
  }

  function add_test() {
    var testValue = city.code + ':' + date;
    var testLabel = city.name + ':' + date;
    if (select.includes(testValue)) {
      return;
    }
    select.push(testValue);
    $('#selected_tests').append('<option value="' + testValue + '">' + testLabel + '</option>');
  }

  function queryTestDayByCity(a, c, b) {
    $.getJSON("getTestDate", {
      productCode: c,
      cityCode: b
    }, function(d) {
        $.each(d, function(date_value, f) {
          $('#date').append('<option value="' + date_value + '">' + date_value + '</option>');
        })
      })
  }

  function queryTestSeat(d, c, b, a) {
    $("#productCode").val(d);
    $("#queryCity").val(c);
    $("#queryTestDate").val(b);
    $.ajax({
      type: "POST",
      headers: {
        "X-CSRF-TOKEN": $("meta[name='_csrf']").attr("content")
      },
      dataType: "json",
      url: "queryTestSeats",
      data: $("#frmQuerySeat").serialize(),
      complete:function(msg){
        ajax_count--;
      },
      success: function(g) {
        console.log(g);
        var city_name = g.cityName;
        var test_day = g.testDay;
        var testSeats = g.testSeats;
        if (g.testDay == undefined) {
          console.log('no data.');
          return;
        }
        for(var i = 0; i<testSeats.length; i++) {
          var seat = testSeats[i];
          for (var j=0; j<seat.testSeat.length; j++) {
            var item = seat.testSeat[j];
            var seat_id = item.seatId;
            var time = test_day;
            var type = item.levelCode;
            var location = item.centerName;
            var province = city_name;
            var opt_status = item.seatStatus;
            var status = "";
            var look = '<input id="' + seat_id + '" value="' + seat_id + '" type="checkbox" class="test_notice" ';
            var notice_find = $.inArray(seat_id,notice);
            if(opt_status == 2){
              status = '<span class="label label-danger">无考位</span>';
              if (notice_find == -1) {
                look += '>';
              } else {
                look += 'checked>';
              }
            } else {
              status = '<span class="label label-success">有考位</span>';
              if(notice_find == -1){
                look += 'disabled>';
              }else{
                sendMessage(seat_id,province,location,time);
                look += 'checked>';
              }
            }
            var html = '<tr><td>' + province + '</td><td>' + location + '</td><td>' + type + '</td><td>' + time + '</td><td>' + status + '</td><td>' + look + '</td></tr>';
            $("#table_content").append(html);
          }
        }
      }
    })
  }

  function test_start(){
    $("#process-3").hide();
    $("#process-4").show();
    setTimeout(function(){
      test_load();
      },1000);
  }

  function test_load(){
    $("#table_finish").hide();
    $("#table_load").show();
    $("#table_content").html("");
    for (var s = 0; s < select.length; s++) {
      var items = select[s].split(':');
      var city_code = items[0];
      var date = items[1];
      if(s == select.length - 1){
        finish = 1;
      }
      ajax_count++;
      queryTestSeat(product, city_code, date, "cn");
    }
    setTimeout(function(){
      test_finish();
    },10000);
  }

  function test_finish(){
    console.log(ajax_count);
    if (ajax_count <= 0){
      ajax_count = 0;
      $("#table_load").hide();
      $("#table_finish").show();
      setTimeout(function(){
        test_load();
        }, 1000);
    }else{
      setTimeout(function(){
        test_finish();
        }, 10000);
    }
  }

  function sendMessage(seat_id,province,location,time){
    if(Notification.permission === 'granted'){
      new Notification('找到考位', {
        body: "省份：" + province + "，地点：" + location + "，考试时间：" + time,
        icon: "https://ielts.neea.cn/images/blogo.png",
        tag:seat_id
      });
      $('#test_audio')[0].play();
    }
  }

  function trim(text){
    return text.replace(/[\s]/g,"");
  }
})();
