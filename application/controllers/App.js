
var
    Garam = require('../../server/lib/Garam')
    ,Express = require('express')
    ,Application = require('../../server/lib/Application');

var Backbone = require('backbone')
    , _ = require('underscore');

var util = require('util');


var App = Application.extend({

    init : function() {
            var self = this;
            if (Garam.getInstance().get('service')){
                Garam.getInstance().on('listenService',function(){

                    var webServer = Garam.getInstance().getService();
                    webServer.addConfigure(
                        function(app) {
                            if (typeof app !== 'undefined') {
                                app.configure(function () {

                                    app.use(Express.static(process.cwd() + '/application/public', { maxAge: 31557600000 }));
                                    app.set('views', process.cwd() + '/application/views');
                                });


                            }
                        }
                    );

                    self.settings = new Backbone.Model();
                    webServer.addRouters('application/routers',function(){

                    });
                 //   self.testdp();



                });

            }






    },
    /**
     *현재 환경과 사용자 환경 설정을 merge 한다.
     * 해당 함수는 두개 이상 존재 하면 안된다.
     * @param callback
     */
    getWorkerConfigure : function(callback) {
        callback({number:1});
    },
    testdp : function() {
            var db = Garam.getDB('game');
          // var GetForecastGameList = db.getDP('GetForecastGameList');

            //var total = 1000,i=0;
            //
            //var User = Garam.getModel('User');
            //
            //_test();
            //function _test() {
            //    process.nextTick(function() {
            //        setTimeout(function(){
            //            _query();
            //
            //        },10)
            //    });
            //
            //}
            //
            //
            //
            //function _query() {
            //    User.find({name:'ssdosso1'},function(err,rows,model){
            //
            //        if(i  < total) {
            //            i++;
            //            console.log(rows)
            //            console.log(util.inspect(process.memoryUsage()));
            //            delete model;
            //            _test();
            //        }
            //
            //
            //
            //
            //    });
            //}


    },
    main: function(callback) {

            callback();

    }


});

exports.app  =App;
exports.className  = 'main';
