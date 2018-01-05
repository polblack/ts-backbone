
import { IComponentWatcher, watchComponent } from '../component/component.watch';

export interface IAttrDirective {
    watcher(value: any);
}

function componentWatcher(component: any) {

}



/**
 * @description An Attribute directive changes the appearance or behavior of a DOM element.
 *              
 */
export class AttributeDirective implements IAttrDirective {

    name: string;




    /**
     * @desc Applies Directive to any of the DOM elements of the component
     * @param component 
     */
    public ApplyToComponent(component: any) {
        if( component.view.$el !== undefined ) {
            component.view.$el.find(`[${this.name}]`).map(
                ( iEl )=>{ 
                    this.Apply( iEl[0], component );
                }
            );
        }
    }

     

    /**
     * @desc Applys Attribute to Dom element
     * @param domEL 
     */
    private Apply( domEL: Element, component: any ) {
        let item = domEL.attributes.getNamedItem(this.name);
        if( item != null) {
            this.appendWatcher(component,this.name,this.watcher);
        }
    }

    watcher(value: any) {

    }

    

}