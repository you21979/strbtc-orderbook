var ANXClient = require('anx');
var Promise = require('bluebird');
var OrderBook = require('trade-util').OrderBook;

var get = function(pair){
    var anx = new ANXClient('', '', pair.toUpperCase().split('_').join(''), 'https://justcoin.com');
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
    return get('STR_BTC')
}
var xrp = exports.xrp = function(){
    return get('XRP_BTC')
}

/*
var private = exports.private = function(pair, api_key, secret_key){
    var w = pair.toUpperCase().split('_');
    var anx = new ANXClient(api_key, secret_key, w.join(''), 'https://justcoin.com');
    return {
        buy : function(price, amount){
            return new Promise(function(resolve, reject){
                anx.newMarketOrderFixedTradedAmount(true, w[0], w[1], amount.toString(), price.toString(), function(err, val){
                    if(err) return reject(err);
                    resolve(val)
                })
            })
        },
        sell : function(price, amount){
            return new Promise(function(resolve, reject){
                anx.newMarketOrderFixedTradedAmount(false, w[0], w[1], amount.toString(), price.toString(), function(err, val){
                    if(err) return reject(err);
                    resolve(val)
                })
            })
        }
    }
}
*/
