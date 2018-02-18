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

class BBModule {

    public name: string;
    public type: string = 'module';
    public components: any[] = [];

    public loaded = false;
    public menus :MenuUi[] = [];
    public routes: RouteInsert[] = [];
    private bootstrap: any;
    public selector: string;

    

    public constructor(params:ModuleParams) {
        if(params['menus']!==undefined) {
            for(let imenu of params['menus'])
            {
                let menu:MenuUi = new MenuUi(imenu.opts);
                for(let item of imenu.items)
                {
                    menu.addItem(item);
                }
                this.menus.push(menu);
            }
        }
        if( params['routes'] !== undefined)
        {
            //Adds current routes to router including BASE PATH of current router
            RouterModule.instance.AddRouters(params.routes);

        }

        if(params['bootstrap'] !== undefined)
        {
            this.selector = params.bootstrap[0].selector;
        }

        
    }

    public Run() {
        this._Init();
        if(this['Init'] !== undefined) {
            this['Init']();
        }
    }

    public _Init(){
        ComponentFactory.GetInstance().render();
        if(this.menus.length>0){
            for(let imenu of this.menus)
            {
                imenu.render();
            }
        }
    }

     

    private setBootstrapComp(boot: any) {
        const newEl = new boot();
        ComponentFactory.GetInstance().load(newEl.selector,newEl);
    }

}

/**
 * Decorator
 */
export function module(params:ModuleParams)
{ 
    ///Registramos el selector para que se generae la planta
 
    return function(constructor:Function){
        let iConstuctorModule:any = constructor;
        constructor.prototype = new BBModule(params);
        constructor.prototype.constructor = constructor;
        return constructor;

    }
   
}
 