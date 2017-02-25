/**
 * @desc : Communications Module
 * 
 */

import * as $ from "jquery";
//import * as _  from "underscore";  
import * as backbone  from "backbone";
import { module } from "../../backbonelib/core";
import { UserLevel }  from "../../backbonelib/ulevel/userlevelmodule";
import { RouterModule } from "../../backbonelib/router/router";
import { debug } from "../../backbonelib/log/debug";

import { CommsInfoComponent } from "./components/info/comms.info.component";
import { CommsSystemComponent } from "./components/system/comms.system.component";

@module({
    bootstrap:[CommsInfoComponent],
    routes:[
        {
            path:'commsinfo',
            module:CommsInfoComponent,
            ul:UserLevel.Basic
        }  ,
        {
            path:'system',
            module:CommsSystemComponent,
            ul:UserLevel.Basic
        }    

        
    ],
    menus:[{
        opts:{
                selector:"sidebarmenu",
                type:"vertical"
            },
            items:[
                {
                    text:"Status",
                    url:"commsinfo",
                    icon:"",
                    iclass:"fa fa-info fa-lg ml-1",
                    ulevel:UserLevel.Basic
                },
                {
                    text:"System",
                    url:"system",
                    icon:"",
                    iclass:"fa fa-gear fa-lg ml-1",
                    ulevel:UserLevel.Basic
                },
                {
                    text:"Ethernet",
                    url:"online",
                    icon:"",
                    iclass:"fa fa-sitemap fa-lg ml-1",
                    ulevel:UserLevel.Basic
                },
                {
                    text:"Network",
                    url:"network",
                    icon:"",
                    iclass:"fa fa-globe fa-lg ml-1",
                    ulevel:UserLevel.Basic
                },
                {
                    text:"Serial Interface",
                    url:"online",
                    icon:"",
                    iclass:"fa fa-random fa-lg ml-1",
                    ulevel:UserLevel.Basic
                }
            ]
        }
    ]
})
export class CommsModule{
    Init(){
        //RouterModule.instance.Navigate("commsinfo",null);
    }
}