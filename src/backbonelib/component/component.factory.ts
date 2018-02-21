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


    items : ComponentItem[]=[];
    private finder: any;


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
    
    /**
     * @description Registers in factory a component
     * @param tag 
     * @param constr 
     */
    public  register(tag:string,constr:any) :void{
        if(this.findIndex(tag)==-1)
        {
            // debug.log("component.factory.register:"+tag);
            this.items.push({
                stag:tag,
                constrctr:constr,
                constrcted:null,
                loaded:false
            });
             
            // debug.log("component.factory.register: tags length: "+this.items.length);
        }
    }

    
    /**
     * @description Loads a tag with a constructor
     * @param tag 
     * @param constructor 
     */
    public load(tag:string,constructor:any) :void{
        // debug.log("component.factory: loaded module for "+tag);
        // // debug.log("loaded "+constructor);
        let index = _.findIndex(this.items,function(d){return d.stag==tag;});
         // debug.log("component.factory: index "+index);
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
    public render(moduleComp?: any, count?:number):void {
        
        // If component exists whe are trying to render SUB components
        count = (count === undefined )? 0 : count;
        
        if(count > 50) return; //Avoid infinite recursion
        if( moduleComp !== undefined ) {
            this.finder = moduleComp;
        } else {
            this.finder = null;
        } 
        for(let item of this.items) {
            const retComp = this.RenderItem(item,
                (this.finder!==null)?
                    this.finder.find(item.stag):
                    $(item.stag)
                );
            if ((moduleComp!== undefined) && (retComp !== false)) {
                // Recursive rendering
                this.render(retComp.view.$el,count+1);
            }
        }
        
    }

    /**
     * @description Finds item
     */

    private RenderItem(item: ComponentItem, onTag?: any) {
        
        if(onTag.length !== 0)
        {
            const component = new item.constrctr();
            // Render on existing tag or on a component
            component.render(onTag);
            if ( component['Init'] !== undefined) { component.Init();}

            // Debemos ver si hay más componentes Hijos en este componente
            return component;
        }
        return false;
    }
    
}

export default ComponentFactory;