// tsc template file for: /var/www/html/ts-backbone/src/backbonelib/ui/menu/view/menu_view.tplt.html
import * as _ from "underscore"
let tplt=`<ul class="nav"> <%= menu %> </ul>`;
let tpltf=function(){return _.template(tplt);}
export {tplt as menu_view }