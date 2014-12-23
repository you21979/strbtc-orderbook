var allcoin = require('allcoin');
var Promise = require('bluebird');
var OrderBook = require('trade-util').OrderBook;
var api = allcoin.PublicApi;

var get = function(pair){
    return api.depth(pair).then(function(res){
        var ob = new OrderBook(pair);
        Object.keys(res.sell).forEach(function(k){
            ob.addAskPriceAmount( parseFloat(k), parseFloat(res.sell[k]) )
        })
        Object.keys(res.buy).forEach(function(k){
            ob.addBidPriceAmount( parseFloat(k), parseFloat(res.buy[k]) )
        })
        return ob;
    })
}

var str = exports.str = function(){
    return get('STR_BTC')
}
var xrp = exports.xrp = function(){
    return get('STR_BTC')
}

