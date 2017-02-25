import { ModbusItemsDictionary } from '../../modules/modbus/inverterdefs';
import * as Backbone from "backbone";
import * as _ from "underscore";
import * as $ from "jquery";
import { debug } from "../log/debug";

/**
 * Component factory:
 *  Sistema encargado de registrar componentes y generarlos
 * 
 * 
 */
interface ComponentItem{
    stag:string,
    constrctr:any,
    constrcted:any,
    loaded:boolean
}



class ComponentFactory{

    public static instance:ComponentFactory;
    public static GetInstance():ComponentFactory{
        if(ComponentFactory.instance == undefined)
        {
            ComponentFactory.instance = new ComponentFactory();
        }
        return ComponentFactory.instance;
    }


    public constructor()
    {
       
        
    }
    items : ComponentItem[]=[];
    
    public   register(tag:string,constr:any) :void{
        if(this.findIndex(tag)==-1)
        {
            debug.log("component.factory.register:"+tag);
            this.items.push({
                stag:tag,
                constrctr:constr,
                constrcted:null,
                loaded:false
            });
             
            debug.log("component.factory.register: tags length: "+this.items.length);
        }
    }
    public   load(tag:string,constructor:any) :void{
        debug.log("component.factory: loaded module for "+tag);
        // debug.log("loaded "+constructor);
        let index = _.findIndex(this.items,function(d){return d.stag==tag;});
         debug.log("component.factory: index "+index);
        if(index!=-1)
        {
            
            this.items[index].constrcted=constructor;
            
        }
    }
    private findIndex(tag:string):number{
        return _.findIndex(this.items,function(d){return d.stag==tag});
    }
    /**
     * @description Searchs for tags and renders Components
     */
    public render():void {
        
        for(let item of this.items)
        {
            
            if($(item.stag).length!=0)
            {
                // debug.log("encontrado!");
                let container=$(item.stag);
                //Si el contenedor está ya renderizado no se le hace caso.
                debug.log("Component Factory: Contenido del container "+item.stag+ " es "+(container.html().trim()==""?"Vacio":"LLeno"));
                if(container.html().trim()!="") continue;
               
                
                
                {
                    if(item.constrcted==null)
                    {
                       console.log(item.constrctr);
                        //Lo construimos
                        item.constrcted=new item.constrctr();
                        
                    }
                    debug.log("component.factory:Rendered By factory "+item.stag);
                    container.append('<div id="component-'+item.stag+'"></div>');
                    let inCont = container.find('div#component-'+item.stag);
                    item.constrcted.render(inCont);
                    if(typeof(item.constrcted['Init'])!="undefined")
                    {
                        item.constrcted['Init']();
                    }
                    item.loaded=true;
                }
            }
        }
    }
    
}

export default ComponentFactory;