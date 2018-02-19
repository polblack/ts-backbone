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
 * Component Decorator
 */
export function component(params:componentparams)
{  
    return function(constructor:Function){
       let iConstuctorComponent:any = constructor;
       const owner = new InnerComponent(params);
       constructor.prototype = _.extend(owner, constructor.prototype);
       
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
