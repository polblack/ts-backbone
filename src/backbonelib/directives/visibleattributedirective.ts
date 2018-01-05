import { AttributeDirective }  from './attributedirective';
import { IComponentWatcher, watchComponent } from '../component/component.watch';


let DomElVisible = (domEl) => (condition) => {
    if(condition) {
        domEl.show();
    }
    else {
        domEl.hide();
    }
};

/**
 * @description Sets visible or not depending on value of expression
 */
export class VisibleAttributeDirective extends AttributeDirective{

    name: 'bb-visible';

    /**
     * @description Makes available execution
     * @param domEl 
     * @param component 
     */
    execute( domEl: any, component: any) {
        watchComponent(component, DomElVisible($(domEl)));
    }
}