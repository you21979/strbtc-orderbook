var Poloniex = require('poloniex.js');
var Promise = require('bluebird');
var OrderBook = require('trade-util').OrderBook;

var get = function(pair){
    var poloniex = new Poloniex();
    return new Promise(function(resolve, reject) {
        var w = pair.toUpperCase().split('_');
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

var private = exports.private = function(pair, api_key, secret_key){
    var w = pair.toUpperCase().split('_');
    var poloniex = new Poloniex(api_key, secret_key);
    return {
        buy : function(price, amount){
            return new Promise(function(resolve, reject) {
                poloniex.buy(w[1], w[0], price, amount, function(err, data){
                    if(err) {
                        return reject(err);
                    }
                    if(data.error){
                        return reject(new Error(data.error));
                    }
                    resolve(data)
                })
            }).then(function(res){
                return new Promise(function(resolve, reject) {
                    poloniex.cancelOrder(w[1], w[0], res.orderNumber, function(err, data){
                        if(err) {
                            return reject(err);
                        }
                        if(data.error){
                            return reject(new Error(data.error));
                        }
                        resolve(data)
                    });
                })
            })
        },
        sell : function(price, amount){
            return new Promise(function(resolve, reject) {
                poloniex.sell(w[1], w[0], price, amount, function(err, data){
                    if(err) {
                        return reject(err);
                    }
                    if(data.error){
                        return reject(new Error(data.error));
                    }
                    resolve(data)
                })
            }).then(function(res){
                return new Promise(function(resolve, reject) {
                    poloniex.cancelOrder(w[1], w[0], res.orderNumber, function(err, data){
                        if(err) {
                            return reject(err);
                        }
                        if(data.error){
                            return reject(new Error(data.error));
                        }
                        resolve(data)
                    });
                })
            })
        }
    }
}
