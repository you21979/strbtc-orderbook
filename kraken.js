var KrakenClient = require('kraken-api');
var Promise = require('bluebird');
var OrderBook = require('trade-util').OrderBook;

var get = function(pair){
    var kraken = new KrakenClient('', '');
    return new Promise(function(resolve, reject) {
        kraken.api('Depth', {"pair": pair.split('_').join('')}, function(err, data) {
            if(err) {
                return reject(err);
            }
            var ob = new OrderBook('kraken', pair);
            Object.keys(data.result).forEach(function(k){
                data.result[k].asks.forEach(function(v){ ob.addAskPriceAmount( parseFloat(v[0]), parseFloat(v[1]) ) })
                data.result[k].bids.forEach(function(v){ ob.addBidPriceAmount( parseFloat(v[0]), parseFloat(v[1]) ) })
            })
            return resolve(ob);
        });
    });
}

var str = exports.str = function(){
    return get('XBT_STR').then(function(book){
        return book.reverse()
    })
}
var xrp = exports.xrp = function(){
    return get('XBT_XRP').then(function(book){
        return book.reverse()
    })
}

var btc = exports.btc = function(){
    return get('XBT_JPY').then(function(book){
        return book
    })
}

