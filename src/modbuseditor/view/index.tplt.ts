// tsc template file for: /var/www/html/ts-backbone/src/modbuseditor/view/index.tplt.html
import * as _ from "underscore"
let tplt=`<nav class="navbar navbar-default"><div class="container-fluid"><!-- Brand and toggle get grouped for better mobile display --><div class="navbar-header"><button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false"><span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span></button> <a class="navbar-brand" href="#">Menu</a></div><div class="collapse navbar-collapse" id="menu"></div></div></nav><div id="content"></div>`;
let tpltf=function(){return _.template(tplt);}
export {tplt as index }