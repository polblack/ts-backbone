import * as Backbone from "backbone";
import * as _ from "underscore";
import ComponentFactory from "./component.factory";
import { debug } from "../log/debug";

export interface componentparams{
    template?:string,
    templateUrl?:any,
    selector:string 
}

/**
 * Clase de componente independiente, que genera un componente no asociado al component.factory
 */
export interface ComponentOptions{
    selector?:string,
    data?:any,
    template?:string,
    templateUrl?:string,
}
export class Component{
    mOptions:ComponentOptions;
    mTemplate:Function;
    public constructor(opts:ComponentOptions)
    {
        this.mOptions = opts;
        this.model = new Backbone.Model();
        
        let template;
        if(typeof(this.mOptions['template'])!='undefined')
        {
             template=_.template(this.mOptions['template']);
        }
        if(typeof(this.mOptions['templateUrl'])!='undefined'){
            template=_.template(this.mOptions['templateUrl']);
        }
        this.mTemplate = template;
        let vview = Backbone.View.extend({
            'model':this.model,
            render:_.bind(function(selector:string)
            {
                alert(  template);
                $(selector).html(template(this.model.attributes));
            },this)
        });
        this.view  = new vview();
    }
    public model:Backbone.Model;
    public view:any;
    public selector:string;
    
    render(selector?:string):void{
        ///Nota: este será substituido en la salida
        let iselector=null;
        if(typeof(selector)=='undefined')
        {
            iselector = selector;
        }
        else if(typeof(this.mOptions['selector'])!='undefined')
        {
            iselector = this.mOptions.selector;
        }
        this.view.render(iselector);

    }
}
 
/**
 * Decorator
 */
export function component(params:componentparams)
{ 
    ///Registramos el selector para que se generae la planta
    //ComponentFactory.GetInstance().register(params.selector);
    return function(constructor:Function){
       let iConstuctorComponent:any = constructor;
       
       let nconstructor = function()
       {
           
           let obj:any = new iConstuctorComponent();
           
           obj.eventHandler = {};
           _.extend( obj.eventHandler,Backbone.Events);
           obj.selector = params.selector;
           obj.type="component";
            if(typeof(constructor['name'])!='undefined'){
                obj.NAME=constructor['name'];
            }
           if(typeof(params.template)!='undefined')
           {
                obj.template = _.template(params.template);
           }
           if(typeof(params.templateUrl)!='undefined')
           {
               
               obj.template = _.template(params.templateUrl);
           }
           ///Obtenemos las llamadas a funcion que se hagan mediante un string en los eventos
           /// del componente y se asocian a los enventos de click de events
           _.each(_.allKeys(obj.events),function(key){
                if(typeof(obj.events[key])=='string'){
                    if(typeof(obj[obj.events[key]])=="function")
                    {
                        if(obj.events[key]=="onRender") return;
                        //Se asocia la funcion al evento y se genera la vista después.
                        obj.events[key] = _.bind(obj[obj.events[key]],obj);
                    }
                }
           });
           var modelDef ;
           
           if(typeof(obj['modelConfig'])=='undefined')
           {
                obj['modelConfig']={};
           }
           
           //Redirection override
           let matchRedirect = document.URL.match(/\?redirect=(.*)/);
           if(matchRedirect && (matchRedirect.length>0))
           {
               
               if(typeof( obj['modelConfig']['url'])!='undefined')
               {
                   
                   obj['modelConfig']['url']=obj['modelConfig']['url']+"?redirect="+matchRedirect[1];
               }
           }
           //Generamos el Modelo, que será la propia clase extendida
           modelDef =  Backbone.Model.extend(obj['modelConfig']);

           var varModel = new modelDef();

           obj.model = varModel;
           ///Generamos la configuracion de la vista
           var viewConf = _.extend(obj,{
               render:function()
               {
                    this.$el.html(obj.template({'model':this.model}));
               }
           });
           
           //Generamos Una vista Backbone
           var BBView = Backbone.View.extend(viewConf);
           
           //render of the module (asociado a la propia view)
           obj.render = function(element:any)
           {
               if(typeof(element)=='undefined')
               {
                   element = params.selector;
               }
                
                obj.view = new BBView({
                    el:element,
                    model: varModel,
                });
                //Render event
                if(typeof(obj['onRender'])!='undefined')
                    obj.eventHandler.listenTo(obj.view,'onRender', _.bind(obj['onRender'],obj) );
                obj.view.render();

                obj.view.trigger('onRender');
                if(typeof(constructor['name'])!='undefined')
                debug.log("triggered on render de "+constructor['name'] );
           }
           
           
           



           return obj; 



       } 
       ///Registramos el Componente en el factory
      ComponentFactory.GetInstance().register(params.selector,nconstructor);
    
      return <any>nconstructor;
       
        
    }
}
/**
 * Clase abstracta de Component
 */

export abstract class ComponentBase{
  
    public model:Backbone.Model;
    public view:any;
    public selector:string;
    public modelConfig:any;
    public components:Component[]=[];
    public CreateComponent(opts:ComponentOptions):Component{
        let comp:Component = new Component(opts);
        this.components.push(
            comp
        );
        return comp;
    }
    public AddComponent(comp:any)
    {
        this.components.push(
            comp
        );
    }
    
    abstract Init():void;
    render(selector?:string):void{
        ///Nota: este será substituido en la salida
    }
}
