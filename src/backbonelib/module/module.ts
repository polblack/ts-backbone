import * as Backbone from "backbone";
import * as _ from "underscore";
import ComponentFactory from "../component/component.factory";
import { RouteInsert , RouterModule } from "../router/router";
import { debug } from "../log/debug";
import { MenuOptions,MenuItem,MenuUi } from "../ui/menu/menu.ui";


interface ModuleMenuEntry{
    opts:MenuOptions,
    items:MenuItem[]
}

export interface ModuleParams{
	bootstrap?:any;//Array of components/modules to launch inmediately
    routes?:RouteInsert[]; //set of routes in format ,
    menus?:ModuleMenuEntry[]
}

/**
 * Decorator
 */
export function module(params:ModuleParams)
{ 
    ///Registramos el selector para que se generae la planta
    debug.log("module-decorator: parametros de module");
    debug.mlog("module-decorator",params);
    let iParams:any = params;
    return function(constructor:Function){
        let iConstuctorModule:any = constructor;
        
        if(typeof(constructor['name']!='undefined')){
            debug.log("module-decorator: init of "+constructor['name']);
        }
        let nconstructor = function()
        {
            this.NAME =(typeof(constructor['name'])!='undefined')?constructor['name']:"";
            if(typeof(constructor['name'])!='undefined'){
                debug.log("module-decorator:init of iConstuctorModule for "+constructor['name']);
            }

            let obj:any = new iConstuctorModule();
            obj.type="module";
            obj.components = new Array();
            obj.selector = "";
            obj.loaded=false;
            if(typeof(constructor['name']!='undefined')){
                obj.NAME=constructor['name'];
            }
            else{
                obj.NAME='';
            }
            obj.menus  = [];
            /** Menu */
            if(typeof(params['menus'])!='undefined')
            {
                for(let imenu of params['menus'])
                {
                    let menu:MenuUi = new MenuUi(imenu.opts);
                    for(let item of imenu.items)
                    {
                        menu.addItem(item);
                    }
                    obj.menus.push(menu);
                }
               
            }
           /** Routing **/
            if(typeof(params['routes'])!='undefined')
            {
                //Adds current routes to router including BASE PATH of current router
                RouterModule.instance.AddRouters(params.routes);

            }
            debug.mlog("module-decorator",iParams);
            ///Modulos insertados en el bootstrap del Modulo

            /** Bootstrap components */
            if(typeof(iParams['bootstrap'])!='undefined')
            {
                for(let modcomp of iParams['bootstrap'])
                {
                   let newEl = new modcomp();
                   if( obj.selector==""){  
                        obj.selector=newEl['selector'];
                   }
                   if(newEl.type=="component"){
                        
                        obj.components.push(newEl);
                        ComponentFactory.GetInstance().load(newEl.selector,newEl);
                   }
                   else if(newEl.type=="module")
                   {
                       //Es un nuevo módulo, de manera que 
                       //No hacemos nada??
                       debug.log("es un nuevo módulo...");
                   }
                   //Si el tipo es un módulo, hay que 
                }
            }

            
            
            
            debug.log("module-decorator: el módulo "+ obj.NAME+" tiene funcion init..."+ ((typeof(obj['Init']))));
            let init = typeof(obj['Init'])=='undefined'?null:obj['Init'];
            //Inicio de Modulo
            obj.Init = function()
            {
                if(typeof(constructor['name'])!='undefined'){
                    debug.log("Launched Initialization on "+constructor['name']);
                }
               
                ComponentFactory.GetInstance().render();
                if(obj.menus.length>0){
                    for(let imenu of obj.menus)
                    {
                        imenu.render();
                    }
                    
                }
                if(init!=null) init();
            }
            return obj;
        }
         
        return <any>nconstructor;


    }
   
}
 