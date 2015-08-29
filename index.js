var tumblr = require('tumblr.js');
var fs = require('fs');
var postProcess = require('./lib/postprocess.js');

var blogName = process.argv[2];
var blogUrl = blogName + 'tumblr.com';
var reFetch = process.argv[3] ? process.argv[3] : false;
var fileName = 'res/' + blogName + '.json';
var tag = "bestiary";

if(!fs.existsSync(fileName) || reFetch) {
  var client = tumblr.createClient({
    consumer_key: 'gz7S4qxEqS61vLEuK87yhR9RUZMjZNC5F9egp1mXfBcpJBcnVU',
    consumer_secret: 'ByoQkSQRloVJbpZhuL0Anc2ii0B50Z5G8DZ168TAoGIr91xVHx'
  });

  client.posts(blogName, {tag: tag}, function(err, resp) {
    var posts = resp.posts;
    fs.writeFile(fileName, JSON.stringify(posts), function(err) {
      if(err) throw err;
      console.log('saved file');
    });
  })
} else {
  fs.readFile(fileName, function(err, data){
    if(err) throw err;
    var posts = JSON.parse(data);
    console.log('read file');
  })
}
