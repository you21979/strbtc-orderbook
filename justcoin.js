var ANXClient = require('anx');
var Promise = require('bluebird');
var OrderBook = require('trade-util').OrderBook;

var get = function(pair){
    var anx = new ANXClient('', '', pair, 'https://justcoin.com');
    return new Promise(function(resolve, reject) {
        anx.fullDepth(function(err, res){
            if(err) {
                return reject(err);
            }
            var ob = new OrderBook('justcoin', pair);
            res.data.bids.forEach(function(v){
                ob.addBidPriceAmount( parseFloat(v.price), parseFloat(v.amount) )
            })
            res.data.asks.forEach(function(v){
                ob.addAskPriceAmount( parseFloat(v.price), parseFloat(v.amount) )
            })
            return resolve(ob);
        })
    });
}

var str = exports.str = function(){
    return get('STRBTC')
}
var xrp = exports.xrp = function(){
    return get('XRPBTC')
}

