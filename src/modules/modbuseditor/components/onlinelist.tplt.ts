// tsc template file for: C:\ROOT\__Programacion\AAX_New\Git\fvwebclient\inverter\src\modules\modbuseditor\components\onlinelist.tplt.html
import * as _ from "underscore"
let tplt=`<table class="table table-bordered table-sm"><thead class="thead-inverse"><tr><th width="30%">Name</th><th width="30%">Value</th><th>Magnitude</th></tr></thead> <%
        if(typeof(model.attributes.info)!='undefined'){
         _.each(model.attributes.info,function(online){ %> <% if(typeof(online)!='undefined'){ %> <tr><td><%= online.id %></td><td><div class="onlinereg" id="<%= online.add %>">--</div></td><td><%= online.magnitude %></td></tr> <% }; %> <%  });
        }   
         %> </table>`;
let tpltf=function(){return _.template(tplt);}
export {tplt as onlinelist }