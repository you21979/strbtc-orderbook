var allcoin = require('./allcoin');
var allcoin = require('./allcoin');
var kraken = require('./kraken');
var Promise = require('bluebird');

var list = [];

list.push(allcoin.str().then(function(book){
    return book.normalize(8).limit(10)
}))
list.push(kraken.str().then(function(book){
    return book.normalize(8).limit(10)
}))

Promise.all(list).then(function(books){
    books.forEach(function(book){
        console.log(book)
    })
});


