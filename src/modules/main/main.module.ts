/**
 * @desc : main módule. Loads all application
 * 
 */

import * as $ from "jquery";
//import * as _  from "underscore";  
import * as backbone  from "backbone";

import { MainComponent } from "./main.component";
import { module } from "../../backbonelib/core";
import { DashboardComponent } from "../dashboard/dashboard.component";

import { UserLevel }  from "../../backbonelib/ulevel/userlevelmodule";
import { RouterModule } from "../../backbonelib/router/router";
import { debug } from "../../backbonelib/log/debug";

@module({
    bootstrap:[DashboardComponent],
    routes:[
        {
            path: "dashboard",
            module: DashboardComponent,
            ul:UserLevel.Basic
        },
       
    ],
    
    menus:[{
                opts:{
                    selector:"mainmenu",
                    type:"vertical"
                },
                items:[
                    {
                        text:"Dashboard",
                        url:"home",
                        icon:"",
                        iclass:"fa fa-dashboard fa-lg ml-1",
                        ulevel:UserLevel.Basic
                    },
                    {
                        text:"Inverter",
                        url:"inverter",
                        icon:"",
                        iclass:"fa fa-server fa-lg ml-1",
                        ulevel:UserLevel.Basic
                    },
                    {
                        text:"Comms Config",
                        url:"comms",
                        icon:"",
                        iclass:"fa fa-wifi fa-lg ml-1",
                        ulevel:UserLevel.Basic
                    }
                ]
            },
            {
        opts:{
                selector:"sidebarmenu",
                type:"vertical"
            },
            items:[]}

    ]
    
})
class MainModule {
    Init():void{
        debug.log("mainmodule:Main Module Initialized");
        //RouterModule.instance.Navigate("dashboard",null);
    }
}

export default MainModule;