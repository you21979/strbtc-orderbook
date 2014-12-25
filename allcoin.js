var allcoin = require('allcoin');
var Promise = require('bluebird');
var OrderBook = require('trade-util').OrderBook;
var api = allcoin.PublicApi;

var get = function(pair){
    return api.depth(pair).then(function(res){
        var ob = new OrderBook('allcoin', pair);
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
    return get('XRP_BTC')
}

var private = exports.private = function(pair, api_key, secret_key){
    var w = pair.split('_');
    var api = allcoin.createPrivateApi(api_key, secret_key, '');
    return {
        buy : function(price, amount){
            return api.buyCoin(w[1], amount, price, w[0]).then(function(res){
                return api.cancelOrder(res.order_id);
            })
        },
        sell : function(price, amount){
            return api.sellCoin(w[1], amount, price, w[0]).then(function(res){
                return api.cancelOrder(res.order_id);
            })
        }
    }
}
