
import * as Backbone from "backbone";
import * as _ from "underscore";
/**
 * @desc Rivet Backbone adapter
 */
if(typeof(rivets.adapters[':'])=='undefined')
{
    rivets.adapters[':'] = {
    observe: function(obj, keypath, callback) {
        obj.on('change:' + keypath, callback)
    },
    unobserve: function(obj, keypath, callback) {
        obj.off('change:' + keypath, callback)
    },
    get: function(obj, keypath) {
        return obj.get(keypath)
    },
    set: function(obj, keypath, value) {
        obj.set(keypath, value)
    }
    }
}

/**
 * @description Rivets component associated to backbone
 */
export function rcomponent(params:any)
{



}

/**
 * Property decorator for rivets (it will connect directly to)
 * it will make accesible value on model and retrievable on class when it changes on model
 */
export function rinput(target: Object, propertyKey: string | symbol, parameterIndex: number)
{
    target['listenTo'](target['model'],'change:'+propertyKey.toString(),_.bind(function(){target[propertyKey]=target['model'].get(propertyKey);},target));
    
}