

 export interface IComponentWatcher {
     property: string,
     value: any
 }

 /**
  * @description Applies whatcher to a property of component
  * @param component 
  * @param watcher 
  * @param event 
  */
 let applyWatcher = (component: any,watcher: Function) => ( property: string ) => {
    if ( typeof(component[property]) === 'function') return;
    if ( property == 'events') return ;
    Object.defineProperty(component, property, {
      
        set(value) {
          component[property] = value;
          //Watch action trigger
          watcher(value);
        }
      });
 };

 /**
 * @description Object Property values watcher, if properties are
 *  string, boolean, array, ...
 *  will be watched to emit an event for directives or others
 */
  export function watchComponent(component: any, watcher: any) {

    component.getPropetyNames().map( applyWatcher(component, watcher));

 }