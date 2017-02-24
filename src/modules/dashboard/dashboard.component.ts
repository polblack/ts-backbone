/**
 * 
 * Componet Dashboard
 * 
 */

import * as $ from "jquery";
import * as _ from "underscore";
import * as Backbone from "backbone";
import { dashboard } from "./dashboard.tplt";
import { component, ComponentBase } from "../../backbonelib/core";
@component({
    templateUrl:dashboard,
    selector:'dashboard'
})
export class DashboardComponent{ 
    Init(){

    }
    events:any = {
         "click #dashboardclick" : 'dashboardclick'
    };
    
    public dashboardclick()
    {
        console.log("dashboard click");
        
         
    }
  
}

