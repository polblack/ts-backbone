// tsc template file for: C:\ROOT\__Programacion\AAX_New\Git\fvwebclient\inverter\src\modules\modbuseditor\modbuseditor.tplt.html
import * as _ from "underscore"
let tplt=`<div class="row"><div class="col-sm-12 col-md-12"><div class="card"><div class="card-header"><div style="float:left">ABI1009_K (1.0)</div><div style="float:left; margin-left:3%"><div id="modbussel" class="btn-group" role="group" aria-label="Basic example"><button class="btn btn-sm btn-secondary" id="loadonline">Online</button> <button class="btn btn-secondary btn-sm" id="loadholding">Holding</button> <button class="btn btn-secondary btn-sm" id="loaddatalogger">Datalogger</button></div></div></div><div class="card-block"><modbuseditorcontent></modbuseditorcontent></div></div></div></div>`;
let tpltf=function(){return _.template(tplt);}
export {tplt as modbuseditor }