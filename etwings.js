var etwings = require('etwings');
var Promise = require('bluebird');
var OrderBook = require('trade-util').OrderBook;
var api = etwings.PublicApi;

var get = function(pair){
    return api.depth(pair).then(function(res){
        var ob = new OrderBook('etwings', pair);
        res.asks.forEach(function(v){
            ob.addAskPriceAmount( v[0], v[1] )
        })
        res.bids.forEach(function(v){
            ob.addBidPriceAmount( v[0], v[1] )
        })
        return ob;
    })
}

var btc = exports.btc = function(){
    return get('BTC_JPY')
}

