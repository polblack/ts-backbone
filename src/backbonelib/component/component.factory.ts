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
        this.tags = new Array();
        this.constructed = new Array();
        this.constructors = new Array();
        
    }
    tags: string[];
    constructors:any[]; 
    constructed:any[]; 

    public   register(tag:string,constr:any) :void{
        if(_.indexOf<string>(this.tags,tag)==-1)
        {
            debug.log("component.factory.register:"+tag);
            
            this.tags.push(tag); 
            this.constructors.push(constr);
            this.constructed.push(null);
            debug.log("component.factory.register: tags length: "+this.tags.length);
        }
    }
    public   load(tag:string,constructor:any) :void{
        // debug.log("loaded module for "+tag);
        // debug.log("loaded "+constructor);
        let index = _.indexOf<string>(this.tags,tag);
        // debug.log("index "+index);
        if(index!=-1)
        {
            
            this.constructed[index]=constructor;
            
        }
    }
    /**
     * @description Searchs for tags and renders Components
     */
    public render():void {
        
        for(let tag of this.tags)
        {
            
            if($(tag).length!=0)
            {
                // debug.log("encontrado!");
                let container=$(tag);
                //Si el contenedor está ya renderizado no se le hace caso.
                debug.log("Component Factory: Contenido del container "+tag+ " es "+(container.html().trim()==""?"Vacio":"LLeno"));
                if(container.html().trim()!="") continue;
                let i = _.indexOf<string>(this.tags,tag);
                
                debug.log("constructed i:  "+tag);
                if(i!=-1)
                {
                    if(this.constructed[i]==null)
                    {
                        debug.mlog("component.factory",this.constructors[i]);
                        //Lo construimos
                        this.constructed[i]=new this.constructors[i]();
                        continue;
                    }
                    debug.log("component.factory:Rendered By factory "+tag);
                    container.append('<div id="component-'+tag+'"></div>');
                    let inCont = container.find('div#component-'+tag);
                    this.constructed[i].render(inCont);
                    if(typeof(this.constructed[i]['Init'])!="undefined")
                    {
                        this.constructed[i]['Init']();
                    }
                }
            }
        }
    }
    
}

export default ComponentFactory;