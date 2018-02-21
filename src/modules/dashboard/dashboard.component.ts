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
import { TestComponent } from '../components/test.component';

@component({
    templateUrl:`
    <test></test>
    <div class="row">
    <div class="col-sm-6 col-md-2">
                <div class="card card-inverse card-warning">
                    <div class="card-block">
                        <div class="h1 text-muted text-xs-right m-b-2">
                            <i class="icon-basket-loaded"></i>
                        </div>
                        <div class="h4 m-b-0" id="dashboardclick">1238</div>
                        <small class="text-muted text-uppercase font-weight-bold">Products sold</small>
                        <progress class="progress progress-xs progress-warning m-t-1 m-b-0" max="100" value="25">25%</progress>
                    </div>
                </div>
            </div>
            <div class="col-sm-6 col-md-2">
                <div class="card card-inverse card-warning">
                    <div class="card-block">
                        <div class="h1 text-muted text-xs-right m-b-2">
                            <i class="icon-basket-loaded"></i>
                        </div>
                        <div class="h4 m-b-0">1238</div>
                        <small class="text-muted text-uppercase font-weight-bold">Products sold</small>
                        <progress class="progress progress-xs progress-warning m-t-1 m-b-0" max="100" value="25">25%</progress>
                    </div>
                </div>
            </div>
            <div class="col-sm-6 col-md-2">
                <div class="card card-inverse card-warning">
                    <div class="card-block">
                        <div class="h1 text-muted text-xs-right m-b-2">
                            <i class="icon-basket-loaded"></i>
                        </div>
                        <div class="h4 m-b-0">1238</div>
                        <small class="text-muted text-uppercase font-weight-bold">Products sold</small>
                        <progress class="progress progress-xs progress-warning m-t-1 m-b-0" max="100" value="25">25%</progress>
                    </div>
                </div>
            </div>
</div>`,
    selector:'dashboard',
    components:[TestComponent]
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

