// tsc template file for: /var/www/html/ts-backbone/src/bblib/modules/menu/view/menuItemView.tplt.html
import * as _ from "underscore"
let tplt=`<li><a href="<%= route %>" class="routelink" data-route="<%= route %>"><%= text %></a><%= childs %></li>`;
let tpltf=function(){return _.template(tplt);}
export {tplt as menuItemView }