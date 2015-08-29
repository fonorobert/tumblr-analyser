var striptags = require('striptags');

module.exports.rawText = function(data) {
  return striptags(data);
}

module.exports.omit = function(data, words) {
  var toSplice = [];
  for (var i = 0; i<data.length; i++) {
    for (var j = 0; j<words.length; j++) {
      if (data[i].word == words[j]) {
        toSplice.push(data[i]);
      }
    }
  }

  for(var k = 0; k<toSplice.length; k++) {
    data.splice(data.indexOf(toSplice[k]), 1);
  }

  return data;

}
