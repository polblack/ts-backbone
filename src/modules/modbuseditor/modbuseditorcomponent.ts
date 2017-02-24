import { component, ComponentBase } from "../../backbonelib/core";
import { modbuseditor } from "./modbuseditor.tplt"
import { InverterDefService , ModbusOnline , ModbusHolding } from "./services/inverterservices";
import { OnlinesComponent } from "./components/onlinescomponent";
import { i8nHelper } from "../modbus/Lang/i18nHelper";
import { CustomValues } from "../modbus/Db/CustomValues";
import { ModbusItemsDictionary } from "../modbus/Db/ModbusItemsDictionary";
import { debug } from "../../backbonelib/log/debug";


@component({
     templateUrl:modbuseditor,
     selector:"modbuseditor"
})
export class ModbusEditorComponent extends ComponentBase {
    inverter : InverterDefService;
    //Componente de Onlines
    editor:OnlinesComponent;
    
    //Custom Values
    cvalues: CustomValues;
    //View events
    events:any={
        "click #loadonline":"LoadOnlines",
        "click #loadholding":"LoadHoldings",
        "click #loaddatalogger":"LoadDataLogger"
    };


    ///Inicialización del componente
    public Init():void{

        i8nHelper.Inst().Load(InverterDefService.instance.GetLangs());
        i8nHelper.Inst().SelectLang("ENGLISH");
        this.inverter = InverterDefService.instance;
        this.InitCustom();
        this.editor = new OnlinesComponent();
        //Debug: esto se tiene que quitar
        this.LoadOnlines();
    }
    
    /**
     * @description. Loads online visualizador
     */

    LoadOnlines():void{
        this.SelectGroupButtonIndex(0);
        let OnlineDict = new ModbusItemsDictionary(this.inverter.GetOnline(),this.cvalues);
        this.editor.Setup(OnlineDict);
        this.LoadEditor();
    }
    /**
     * @description. Loads holding visualizador
     */

    LoadHoldings():void{
        this.SelectGroupButtonIndex(1);
       let HoldingDict = new ModbusItemsDictionary(this.inverter.GetHolding(),this.cvalues);
        this.editor.Setup(HoldingDict);
        this.LoadEditor();
    }
    /**
     * 
     */
    LoadDataLogger():void{
          this.SelectGroupButtonIndex(2);
          this.view.$el.find('onlinescomponent').remove();
    }
    /**
     * 
     */
    LoadEditor():void{
        if(this.view.$el.find('onlinescomponent').length==0){
            this.view.$el.find('modbuseditorcontent').append("<onlinescomponent></onlinescomponent>");
            this.editor.render('onlinescomponent');
        }
        else{
            this.editor.render('onlinescomponent');
        }
    } 



    private SelectGroupButtonIndex(index:number)
    {
        let selIndex = index;
        $("#modbussel > button").each(function(i,e)
        {
            debug.log("modbuseditorcomponent:"+selIndex+":"+i);
            debug.mlog("modbuseditorcomponent",e);
            if(i==selIndex){
                $(e).addClass("btn-primary");
                $(e).removeClass("btn-secondary");
            }
            else{
                $(e).removeClass("btn-primary");
                $(e).addClass("btn-secondary");
            }
            
           
            

        });
    }

    /**
     * @description Load Custom Values from definition file
     */
    InitCustom():void{
        this.cvalues = new CustomValues(this.inverter.GetCustomTypes());
    }
}