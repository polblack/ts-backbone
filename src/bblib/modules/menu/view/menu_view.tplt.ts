// tsc template file for: /var/www/html/ts-backbone/src/bblib/modules/menu/view/menu_view.tplt.html
import * as _ from "underscore"
let tplt=`<ul class="nav navbar-nav"> <%= menu %> </ul>`;
let tpltf=function(){return _.template(tplt);}
export {tplt as menu_view }