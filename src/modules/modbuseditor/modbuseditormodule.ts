import * as $ from "jquery";
//import * as _  from "underscore";  
import * as backbone  from "backbone";  
import { module, UserLevel } from "../../backbonelib/core";
import { userchangemsg } from "../../backbonelib/ulevel/userlevelmodule";
import { ModbusEditorComponent } from "./modbuseditorcomponent";


///Start executing:
@module({
    bootstrap:[ModbusEditorComponent]
    ,
    menus:[{
        opts:{
                selector:"sidebarmenu",
                type:"vertical"
            },
            items:[
                {
                    text:"Info (Online)",
                    url:"holding",
                    icon:"",
                    iclass:"fa fa-info fa-lg ml-1",
                    ulevel:UserLevel.Basic
                },
                {
                    text:"Config (Holding)",
                    url:"online",
                    icon:"",
                    iclass:"fa fa-gear fa-lg ml-1",
                    ulevel:UserLevel.Basic
                }
            ]
        }
    ]
})
export class ModbusEditorModule{
    
}

 
  