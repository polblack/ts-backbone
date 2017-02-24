// tsc template file for: C:\ROOT\__Programacion\AAX_New\Git\fvwebclient\inverter\src\backbonelib\ui\menu\view\submenuview.tplt.html
import * as _ from "underscore"
let tplt=`<li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"> <%= text %> <span class="caret"></span></a><ul class="dropdown-menu"> <%= submenu %> </ul></li>`;
let tpltf=function(){return _.template(tplt);}
export {tplt as submenuview }