import { component, ComponentBase } from "../../../backbonelib/core";
import { ModbusOnline } from "../services/inverterservices";
import { onlines } from "./onlines.tplt";
import { i8nHelper } from "../../modbus/Lang/i18nHelper";
import { UserLevelModule, UserLevel } from "../../../backbonelib/ulevel/userlevelmodule";
import { CustomValues } from "../../modbus/Db/CustomValues";
import { ModbusItemsDictionary, ModbusItem } from "../../modbus/inverterdefs";
import { OnlinesListComponent } from "./modbusitemslistcomponent";
import { debug } from "../../../backbonelib/log/debug";
import * as $ from "jquery"; 


interface OutOnline{
    id:string,
    add:string, //Modbus Address: startbit
    magnitude:string,

    
}
/**
 * Componente de mostrado de Online registers
 */
@component({
     templateUrl:onlines,
     selector:"onlinescomponent"
})
export class OnlinesComponent extends ComponentBase {
    public loaded:boolean;
    mDict:ModbusItemsDictionary;
    info:OutOnline[];
    categories:string[];
    ///Data loaded Last Time
    readedData:any=[];
    
    //Selected category index
    cat_sel:number=0;

    
    events={
        'click #readonline':"Read",
        'click .category':"evClickCategory"
        
    };

    public constructor()
    {
        super();
        this.info = [];
        this.loaded = false;
    }
    /**
     * @description Initialization
     */
    Init(){

    }

    /**
     * @description Setup Dicctionary to View/Edit
     */
    public Setup(dict:ModbusItemsDictionary)
    {
        this.mDict = dict;
        debug.log("onlinescomponent: SEtup categories");
        debug.mlog("onlinescomponent",dict.GetCategories());
        this.categories = dict.GetCategories();
        this.model.set('categories',this.categories);
        this.readedData=[];
        
        
    }
    /**
     * OnRender event attend
     */
    protected onRender(){
        
        this.LoadCategoryByIndex(this.cat_sel);
    }
    /**
     * @description Event of click category
     */
    private evClickCategory(e)
    {
        let id =parseInt( $(e.currentTarget).attr('id').replace(/.*-cat-/,''));
        if(this.cat_sel==id) return;
        this.cat_sel = id;
        
        this.LoadCategoryByIndex(id);
    }

    ///Load Category By index
    private LoadCategoryByIndex(index:number)
    {
        
        
        this.Load(this.mDict.GetOnlinesByCat(this.categories[index]));
        
    }


    /**
     * Load ModbusOnline Definition
     */
    public Load(onlines: ModbusItem[])
    { 
        //Cleer de la info
        this.info=[];

        let curlvl = UserLevelModule.instance.curlevel;
        let ih = i8nHelper.Inst();
        ih.SelectLang("SPANISH");
        
        for(let mitem of onlines)
        { 
            let online= mitem as ModbusOnline;
            //Avoid User level less elements
            if(online.u < curlvl) continue;
            this.info.push({
                id:ih.Get(online.tid),
                add:this.model.cid+'-'+online.add+"-"+online.start,
                magnitude:(online.m!=null)?ih.Get(online.m):""
                
            });
        }
        this.loaded = true;
        let newComp = new OnlinesListComponent();
        newComp.model.set("info",this.info);
        newComp.render();
         this.SetValues();

    }
    /**
     * @description Publica el grid en el selector establecido
     */
    public Publish(selector:string)
    {
        
        this.render(selector);
       
        
    }

     
   
    /**
     * @description Lanza la lectura de los ONLINE mediante el servicio
     */ 

    public Read()
    {
        ///TODO: mock
        this.readedData = [
            {
                "address":10,
                "startbit":0,
                "value":125 
            },
            {   
	            "address":10,
                "startbit":3,
                "value":12
	        }

        ];

        this.SetValues( );
       

        
    }
    /**
     * Sets Values Of data inserted
     */

    public SetValues()
    {
        for(let elVal of this.readedData)
        {
           
            let Tag:string = "#"+elVal['address']+":"+elVal['startbit'];
            console.log("onlinescomponent:Tag "+Tag);
            let curEl = this.view.$el.find("#"+this.model.cid+"-"+elVal['address']+"-"+elVal['startbit']);
            if(curEl.length>0)
            {
               
                let trVal = this.mDict.GetValue(elVal['address'],elVal['startbit'], elVal['value']);
                if(trVal==null) continue;
                curEl.html(trVal);
            }
        }
    }
    


}

