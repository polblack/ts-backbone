console.log("loaded tplt-ts-loader");
import { getOptions, getCurrentRequest } from 'loader-utils';


const schema = {
  type: 'object',
  properties: {
    test: {
      type: 'string'
    }
  }
} 

export default function(source) {
  //var callback = this.async();
  const defaultModule = this.options.entry
      .replace(/\.tplt\.html$/,'')
      .split('/')
      .reverse()[0];

  source = source.replace(/\r\n/,''); /// Delete carrigage retur
   
  // makes a tplt.html element a typescript element
  return 'import * as _ from \'underscore\';'+
         'let tplt = \`\`;'+
         'let ftplt = function() { return _.template(tplt);};'+
         'export { ftplt as '+defaultModule+' };'
};
