

 export interface IobjWatcher {
     property: string,
     value: any
 }

 /**
  * @description Applies whatcher to a property of obj
  * @param obj 
  * @param watcher 
  * @param event 
  */
 let applyWatcher = (obj: any) => ( property: string ) => {
    if ( typeof(obj[property]) === 'function') return;
    if ( property == 'events') return ;
    if ( property == 'watchers') return ;
    /// For property generate watchers
    if (obj.watchers[property] === undefined ) {
        obj.watchers[property] = [];
     }
    Object.defineProperty(obj, property, {
      
        set(value) {
          obj[property] = value;
          //Watch action execute
          obj.watchers[property].map(function(f){ f(value);});
          
        }
      });
 };

 /**
 * @description Object Property values watcher, if properties are
 *  string, boolean, array, ...
 *  will be watched to emit an event for directives or others
 */
  export function watchobj(obj: any) {
    if( obj.watchers === undefined ) {
        obj.watchers = {};
        obj.getPropetyNames().map( applyWatcher(obj));
    }

 }

 /**
  * @description Appends a watcher to a property of a Object
  */

 export function appendWatcher( obj: any, property: string, watch: Function ) {
    
    ///Make Object whatched
    watchobj(obj);
    obj.watchers[property].push(watch);

}