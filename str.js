var allcoin = require('./allcoin');
var justcoin = require('./justcoin');
var poloniex = require('./poloniex');
var kraken = require('./kraken');
var Promise = require('bluebird');

var list = [];

var bookformat = function(book){
    return book.normalize(7).limit(1)
}

list.push(allcoin.str().then(bookformat))
list.push(kraken.str().then(bookformat))
list.push(poloniex.str().then(bookformat))
list.push(justcoin.str().then(bookformat))

Promise.all(list).then(function(books){
    books.forEach(function(book){
        console.log(book)
    })
});


