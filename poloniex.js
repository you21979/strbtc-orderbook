var Poloniex = require('poloniex.js');
var Promise = require('bluebird');
var OrderBook = require('trade-util').OrderBook;

var get = function(pair){
    var poloniex = new Poloniex();
    return new Promise(function(resolve, reject) {
        var w = pair.split('_');
        poloniex.getOrderBook(w[1], w[0], function(err, res){
            if(err) {
                return reject(err);
            }
            if(res.error){
                return reject(new Error(res.error));
            }
            var ob = new OrderBook('poloniex', pair);
            res.bids.forEach(function(v){
                ob.addBidPriceAmount( parseFloat(v[0]), v[1] )
            })
            res.asks.forEach(function(v){
                ob.addAskPriceAmount( parseFloat(v[0]), v[1] )
            })
            return resolve(ob);
        })
    });
}

var str = exports.str = function(){
    return get('STR_BTC')
}
var xrp = exports.xrp = function(){
    return get('XRP_BTC')
}

