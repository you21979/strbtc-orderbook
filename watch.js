var allcoin = require('./allcoin');
var justcoin = require('./justcoin');
var poloniex = require('./poloniex');
var kraken = require('./kraken');
var btcbox = require('./btcbox');
var etwings = require('./etwings');
var Promise = require('bluebird');

var util = require('trade-util').util;


var bookformat = function(book){
    return book.normalize(7).limit(1)
}


var watch = function(list){
    console.log("in %d", process.uptime())
    return Promise.all(list).then(function(books){
        var match = util.orderMatching(books);
        var buy = match.deal.buy;
        var sell = match.deal.sell;
        console.log("--------------------------------------------------------------------")
        console.log("out %d", process.uptime())
        if(match.result){
            console.log("buy: %s, price %d, amount:%d", buy.name, buy.price, buy.amount)
            console.log("sell: %s, price %d, amount:%d", sell.name, sell.price, sell.amount)
        }else{
            console.log("NG ask:%s %d | bid:%s %d", buy.name, buy.price, sell.name, sell.price)
        }
        return true;
    });
}

var f = [
    function btc(list){
        list.push(btcbox.btc().then(bookformat))
        list.push(etwings.btc().then(bookformat))
        list.push(kraken.btc().then(bookformat))
    },
    function str(list){
        list.push(allcoin.str().then(bookformat))
        list.push(kraken.str().then(bookformat))
        list.push(poloniex.str().then(bookformat))
        list.push(justcoin.str().then(bookformat))
    },
    function xrp(list){
        list.push(allcoin.xrp().then(bookformat))
        list.push(kraken.xrp().then(bookformat))
        list.push(poloniex.xrp().then(bookformat))
        list.push(justcoin.xrp().then(bookformat))
    }
]

var n = 0;
var select = function(){
    return f[(n++) % f.length];
}

var update = function(){
    var list = [];
    select()(list);
    return watch(list).delay(10000).then(function(){
        return update()
    }).catch(function(err){
        console.log(err);
        return update();
    })
}
update();
