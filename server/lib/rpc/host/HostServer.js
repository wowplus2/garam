var _ = require('underscore')
    , fs = require('fs')
    , Garam = require('../../Garam')
    , Base = require('../../Base')
    , async = require('async')

    , Net = require('net' )
    , domain = require('domain')
    , Client = require('./client')
    , assert= require('assert');

exports = module.exports = Server;

function Server (options) {
    Base.prototype.constructor.apply(this,arguments);
    this.options = options;
    this._client = {};
    this.open = {};

};

_.extend(Server.prototype, Base.prototype, {
    create : function(server) {


    },
    listen : function(callback) {
        var self = this;
        this._server = Net.createServer();
        this._server.listen(this.options.port,function(){
            console.log(' Net listening on port '+self.options.port);
            callback();
        });

        self._server.on('connection',function(socket) {
            var id = self.generateId();

            // self._setHandlers();
            self.open[id] = true;
            self._client[id] = new Client(id,self);
            self._client[id].init(socket);
            self.emit('connection',self._client[id]);
            //self.emit.call(self._client[id],'connection',socket);

        });
    },
    getSever : function() {
        return this._server;
    },
    generateId : function() {
        return Math.abs(Math.random() * Math.random() * Date.now() | 0).toString()
            + Math.abs(Math.random() * Math.random() * Date.now() | 0).toString();
    },



});