import * as Backbone from "backbone";
import * as _ from "underscore";
import ComponentFactory from "./component.factory";
import { debug } from "../log/debug";

import { ComponentOptions, componentparams } from './component.interfaces';
import { CreateModel, CreateView, InnerComponent } from './component.viewmodel';

/**
 * @description Class Extender
 * @param ChildClass 
 * @param ParentClass 
 */
function extend(ChildClass, ParentClass) {
	ChildClass.prototype = new ParentClass();
	ChildClass.prototype.constructor = ChildClass;
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
       const owner = new InnerComponent(params);
       constructor.prototype = owner;
       constructor.prototype.constructor = constructor;
       
       /// Register constructor in factory
       ComponentFactory.GetInstance().register(params.selector, constructor);
      return <any>constructor;
       
        
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
    
    
}
