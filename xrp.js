var allcoin = require('./allcoin');
var justcoin = require('./justcoin');
var poloniex = require('./poloniex');
var kraken = require('./kraken');
var Promise = require('bluebird');

var list = [];

var bookformat = function(book){
    return book.normalize(7).limit(1)
}

list.push(allcoin.xrp().then(bookformat))
list.push(kraken.xrp().then(bookformat))
list.push(poloniex.xrp().then(bookformat))
list.push(justcoin.xrp().then(bookformat))

Promise.all(list).then(function(books){
    books.forEach(function(book){
        console.log(book)
    })
});


