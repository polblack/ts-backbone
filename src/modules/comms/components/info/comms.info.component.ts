/**
 * 
 * @desc: Comms Main component
 */

import { component , ComponentBase, debug } from "../../../../backbonelib/core";
import { commsinfo } from "./commsinfo.tplt";
@component({
    templateUrl:commsinfo,
    selector:"commsinfo",
    
})
export class CommsInfoComponent extends ComponentBase {
    Init(){
        debug.log("comms.info: Inicializado!");
       
    }
    events:any={
        "model:change":'render'
    }
    modelConfig:any={
        'url':'system/info/device'
    }
    onRender(){
        this.view.listenTo(this.model,"change",this.view.render);         
        this.model.fetch({
            error:function(ret){
                console.log("error");
                console.log(ret);
            }
        });
       
    }
    
}