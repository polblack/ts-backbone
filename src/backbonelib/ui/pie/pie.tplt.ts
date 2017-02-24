// tsc template file for: C:\ROOT\__Programacion\AAX_New\Git\fvwebclient\inverter\src\backbonelib\ui\pie\pie.tplt.html
import * as _ from "underscore"
let tplt=`PIE<div id="<%= pieID %>" class="donut-size"><div class="pie-wrapper"><span class="label"><span class="num">0</span><span class="smaller">%</span></span><div class="pie"><div class="left-side half-circle"></div><div class="right-side half-circle"></div></div><div class="shadow"></div></div></div>`;
let tpltf=function(){return _.template(tplt);}
export {tplt as pie }