var parseFile = require("./src/parsefile.js");
var writeMarkdown = require("./src/writemarkdown.js");
var fs = require("fs");

/*
 * @object doccy
 * @description the doccy module
 */
var doccy = {
  /*
   * @name init_grunt
   * @param filename the src file to read for docstrings
   * @param output the file name to output markdown into
   * @param done the Grunt promise object to call when finished
   */
  init_grunt: function(filename, output, _done) {
    //console.log('----',filename);
    //console.log('+++++', output);
    fs.readFile(filename, "utf-8",  function(err, contents) {
      if(err) {this.logg(err);}
      var parsed = parseFile.parse(contents);
      var markdown = writeMarkdown.parse(parsed);
      this.writeToFile(markdown, output, _done);
    }.bind(this));
    
  },
  /*
   * @name init
   * @param filename the src file to read for docstrings
   * @param output the file name to output markdown into
   */
  init: function(filename, output) {
    //console.log('----',filename);
    //console.log('+++++', output);
    fs.readFile(filename, "utf-8",  function(err, contents) {
      if(err) {this.logg(err);}
      var parsed = parseFile.parse(contents);
      var markdown = writeMarkdown.parse(parsed);
      this.writeToFile(markdown, output);
    }.bind(this));
    
  },
  /*
   * @name writeToFile
   * @param markdown the result of calling writeMarkdown.parse
   * @param output the filename to output to
   */
  writeToFile: function(markdown, output, _done) {
    var toWrite = [];
    markdown.forEach(function(block) {
      toWrite.push(block.join("\n\n"));
    });
    var contents = toWrite.join("\n\n");
    fs.writeFile(output, contents, function(err) {
      if(err) console.log(err);
      console.log("File " + output + " written.");
      if (_done) {
       console.log('exectuing DONE');
        _done();
      }
      
    });
  }
};

module.exports = doccy;


