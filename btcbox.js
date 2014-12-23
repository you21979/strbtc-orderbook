var btcbox = require('btcbox');
var Promise = require('bluebird');
var OrderBook = require('trade-util').OrderBook;
var api = btcbox.PublicApi;

var get = function(pair){
    return api.depth(pair.toLowerCase().split('_').shift()).then(function(res){
        var ob = new OrderBook('btcbox', pair);
        res.asks.reverse().forEach(function(v){
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

