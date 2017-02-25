// tsc template file for: /var/www/html/ts-backbone/src/backbonelib/ui/menu/view/menuItemView.tplt.html
import * as _ from "underscore"
let tplt=`<li class="nav-item"><a class="nav-link" data-bb-url="<%= url %>" href="#<%= url %>"> <% if(iclass!="") {%> <i class="<%= iclass %>"></i> <% } %> <%= text %></a> <%= childs %> </li>`;
let tpltf=function(){return _.template(tplt);}
export {tplt as menuItemView }