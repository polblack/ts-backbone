import { component , ComponentBase, debug } from "../../../../backbonelib/core";
import { commssystem } from "./commssystem.tplt";
import { PieUi } from "../../../../backbonelib/ui/pie/pie.component";

@component({
    templateUrl:commssystem,
    selector:"commssystem",
    
})
export class CommsSystemComponent extends ComponentBase {
    pie: PieUi;
    Init(){
        debug.log("comms.info: Inicializado!");
       
    }
    events:any={
        "model:change":'render'
    }
    modelConfig:any={
        'url':'/system/info/memory'
    }
    onRender(){
        this.pie = new PieUi({
            selector:"pie"
        });
        this.view.listenTo(this.model,"change",this.view.render);         
        this.model.fetch({
            error:function(ret){
                console.log("error");
                console.log(ret);
            }
        });
        this.pie.render();
       
    }
    
}