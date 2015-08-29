var wordify = require('wordify');
var postProcess = require('./postprocess.js');
var fs = require('fs');

module.exports.basic = function(posts, postNumber) {

  if(postNumber) {
    var rawText = postProcess.rawText(posts[postNumber].body);
  } else {
    var rawText = postProcess.rawText(posts[0].body);
  }


  var stats = wordify.stats(rawText);
  var wordcount = wordify.count(rawText);
  var topFive = [];
  var mostUsed = {word: "", count: 0};

  var badWords = ['fuck', 'fucking', 'fucker', 'cunt', 'dick', 'cock', 'shit', 'pussy', 'bitch', 'bitching', 'fucked'];
  var badWordCount = 0;

  var words = [];

  fs.writeFileSync('res/stats.json', JSON.stringify(stats));

  Object.keys(stats).forEach(function(key) {
    words.push({word: key, count: stats[key].count});
  })
  fs.writeFileSync('res/words.json', JSON.stringify(words));

  var omittable = ['it', 'in', 'on', 'a', 'the', 'and', 'of', 'that', 'this', 'is', 'it\'s', 'its', 'to', 'with', 'for', 'i', 'or', 'if'];

  fs.writeFileSync('res/omittable.json', JSON.stringify(omittable));

  words = postProcess.omit(words, omittable);

  fs.writeFileSync('res/afteromit.json', JSON.stringify(words));
  for (var i = 0; i<5; i++) {
    words.forEach(function(value, index){
      var current = words[index]
      if(current.count > mostUsed.count) {
        mostUsed = current;
      }
      badWords.forEach(function(badword, key) {
        if (current.word == badword) {
          badWordCount += current.count;
        }
      })
    });

    words.splice(words.indexOf(mostUsed), 1);
    topFive.push(mostUsed);
    mostUsed = {word: "", count: 0};
  }

  var result = {
    wordcount: wordcount,
    topfive: topFive,
    badwordcount: badWordCount
  }

  return result;



}
