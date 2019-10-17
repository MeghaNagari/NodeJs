var mv = require('mv');
var fs = require('fs');
var http = require('http');
var formidable = require('formidable');
var dt = require('./ReadDir');
var filesArray = [];


http.createServer(function (req, res) {
  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      var newpath =  './' + files.filetoupload.name;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
//		console.log("files Array",filesArray);
        if(!filesArray.includes(files.filetoupload.name))
  		{
   		filesArray.push(files.filetoupload.name);}
        res.writeHead(200, {'Content-Type': 'text/html'});
    	res.write('<h2>List of files</h2>');
        for(var i = 0; i < filesArray.length; i++){
        	res.write(filesArray[i]+"<br>");
        }
	      res.end();
       
      });
      const testFolder =  "./";
      fs.readdir(testFolder, (err, data) => {
//      	console.log("my files",files);
      	data.forEach(d => {
      		if(!filesArray.includes(d))
      		{
       		filesArray.push(d);}
        });
      });
 });
  } 
  if (req.url == '/'){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
}).listen(3331);
