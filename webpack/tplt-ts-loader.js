import { getOptions, getCurrentRequest } from 'loader-utils';
var fs = require('fs');
var path = require('path');

const schema = {
  type: 'object',
  properties: {
    test: {
      type: 'string'
    }
  }
} 

export default function(source) {
  var callback = this.async();
  
  const filePath = path.resolve(this.options.context,this.options.entry);
  const newName = filePath.replace(/\.html/,'.ts');
  const defaultModule = this.options.entry
      .replace(/\.tplt\.html$/,'')
      .split('/')
      .reverse()[0];

  source = source.replace(/\r\n/,''); /// Delete carrigage retur
 // return `export let data='${JSON.stringify(path.resolve(basePath,this.options.entry))}'`;
  fs.readFile(filePath, 'utf-8', function(err, filecontent) {
    if(err) return callback(err);
    var contentNew = 'import * as _ from "underscore";'+
      'let tplt = \`\`;'+
      'let ftplt = function() { return _.template(tplt);};'+
      'export { ftplt as '+defaultModule+' };'
      fs.writeFile(newName,contentNew,function(err){
        if(err) return callback(err);
        callback(null, contentNew);
      });
    // Escribimos en fichero esto

      

  });
  // makes a tplt.html element a typescript element
  
};
