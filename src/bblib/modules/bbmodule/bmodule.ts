import * as Backbone from "backbone";
import * as _ from "underscore";
/**
 * Decorator
 */
export function bmodule(params:any)
{ 
    return function(constructor:any){
       return  _.extend(constructor, Backbone.Events);
    }
}
