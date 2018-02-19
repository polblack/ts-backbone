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
    private bootstrap: any[] = [];
    public selector: string;

    

    public constructor(params:ModuleParams) {

        console.log("constructor for module PARAMS");
        console.log(params);
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
            this.bootstrap = params.bootstrap;
            console.log("selector on bootstrap::"+params.bootstrap[0].prototype.selector);
            this.selector = params.bootstrap[0].prototype.selector;
        }
        console.log("Module constructor end");
        
       
    }
 

    /**
     * @description Runs Module
     */
    public Run() {
        this._Init();
        console.log(this['Init']);
        if(this['Init'] !== undefined) {
            this['Init']();
        }
    }

    /** 
     * @description Initializes module
    */
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
        console.log("setting bootstrap for");
        console.log(boot);
        const newEl = new boot();
        ComponentFactory.GetInstance().load(newEl.selector,newEl);
    }

    public Destroy() {
        this.components.map((c)=>{ c.Destroy();});
    }

}




/**
 * Decorator
 */
export function module(params:ModuleParams)
{ 
    // Generates a module extended Module class
 
    return function(constrct:any){
        const BModule =  new BBModule(params);
        constrct.prototype = _.extend(BModule, constrct.prototype);
        constrct.prototype.NAME = constrct['name'] === undefined ? 'unknown':constrct.name;
        constrct.constructor = constrct;
        return <any> constrct;
    }
   
}

 