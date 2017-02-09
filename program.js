var fs = require('fs');
var path = require('path');
var module = require('./modular');
var http = require('http');
 var bl = require('bl');
 var url = require('url');

/*var i, tab, temp;
temp = 0;
tab = process.argv;
for(i=2;i<tab.length;i++)
{
	
	temp=temp + Number(process.argv[i]);
}
console.log(temp);
*/

// filesystem operation 
/*
var fs = require('fs');
var buf = Buffer.alloc(process.argv[2].length);
var str;
buf=fs.readFileSync(process.argv[2]);
str = buf.toString();
var arrayStr;
arrayStr=str.split('\n');
console.log(arrayStr.length-1);

// correcytion 
 var fs = require('fs')

    var contents = fs.readFileSync(process.argv[2])
    var lines = contents.toString().split('\n').length - 1
    console.log(lines)

    // note you can avoid the .toString() by passing 'utf8' as the
    // second argument to readFileSync, then you'll get a String!
    //
    // fs.readFileSync(process.argv[2], 'utf8').split('\n').length - 1
    */


    //single asynchronus filesystem 
/*
var fs = require('fs');
fs.readFile(process.argv[2],'utf8',function callback(err,data){
	if(err) throw err;
	console.log(data.split('\n').length -1);
});
*/

//get aall files with a special extension 
/*
var type = process.argv[3];
fs.readdir(process.argv[2],function (err,list){
	if(err) console.log(err);
	//get all files with path.extname(filename) == type
	list.forEach(function(i){
		if(path.extname(i)=="."+type){console.log(i);}
	});
})
*/

//module.getFiles(process.argv[2],process.argv[3])

//http client 
/*
var http = require('http');

http.get(process.argv[2], function callback(response) {
  response.setEncoding('utf8');
  response.on('data', function (chunk) {
    console.log(chunk);});

}).on('error', function(e) {
  console.log("Got error: " + e.message);
});

//correction : 
 var http = require('http')

    http.get(process.argv[2], function (response) {
      response.setEncoding('utf8')
      response.on('data', console.log)
      response.on('error', console.error)
    }).on('error', console.error)
    */

//http collect 

/*


	http.get(process.argv[2], function (response){
			
		response.pipe(bl( function(err,data){if(err)console.log(err); 
			console.log(data.toString().length);
			console.log(data.toString());}   ))
}
			).on('error',console.error)
 
 //correction : 

    http.get(process.argv[2], function (response) {
      response.pipe(bl(function (err, data) {
        if (err) {
          return console.error(err)
        }
        data = data.toString()
        console.log(data.length)
        console.log(data)
      }))
    })*/

//theyr send not in à la suite 
/*
 getHTTP(process.argv[2]);
 getHTTP(process.argv[3]);
 getHTTP(process.argv[4]);

   function getHTTP (url){ http.get(url, function (response){
			
		response.pipe(bl( function(err,data){if(err)console.log(err); 
		
			console.log(data.toString());}   ))}
			).on('error',console.error)
}*/


//serveur http 
/*
 var servListen = process.argv[2];
 var file=process.argv[3];

 var serveur = http.createServer(function(req,res){
		var src = fs.createReadStream(file);
		src.pipe(res);
 })
serveur.listen(servListen);

//solution : 

var server = http.createServer(function (req, res) {
      res.writeHead(200, { 'content-type': 'text/plain' })

      fs.createReadStream(process.argv[3]).pipe(res)
    })

    server.listen(Number(process.argv[2]))
*/

//http json api
function parsetime (time) {
  return {
    hour: time.getHours(),
    minute: time.getMinutes(),
    second: time.getSeconds()
  }
}

function unixtime (time) {
  return { unixtime: time.getTime() }
}
var server = http.createServer(function (req, res) {

	  var parsedUrl = url.parse(req.url, true)
  var time = new Date(parsedUrl.query.iso)

  var result

  if (/^\/api\/parsetime/.test(req.url)) { //test si un format ou l'autre
    result = parsetime(time)
  } else if (/^\/api\/unixtime/.test(req.url)) {
    result = unixtime(time)
  }

     if (result) {		//rechercher stringify 
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(resutl))
  } else {
    res.writeHead(404) //si rien, put 404 
    res.end()
  }

      
    })

    server.listen(Number(process.argv[2]))