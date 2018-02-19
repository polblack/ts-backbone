import * as Backbone from "backbone";
import * as _ from "underscore";
import { ComponentOptions, componentparams } from './component.interfaces';



/**
 * @desc BBModel 
 */
class BBModel extends Backbone.Model{

};

class BBView extends Backbone.View<BBModel>{

};

/**
 * @description Creates Model 
 * @param options 
 */
export function CreateModel(options: ComponentOptions) {
    this.model = new BBModel();
    return this.model;
}

export function CreateView(mainObj: any,
    bmodel: Backbone.Model,
    options: ComponentOptions) {

    const vOpts: Backbone.ViewOptions<BBModel>={};
    
    

   // Events Override
    if(mainObj['events']!==undefined) {
        const BindedEvents =  _.allKeys(mainObj.events).reduce(
            function(pkey: any, curKey: string, i: number, nEvent: any){
                if(typeof(mainObj.events[curKey])=='string'){
                    if(typeof(mainObj[mainObj.events[curKey]])=="function")
                    {
                        // On render event protection
                        if(mainObj.events[curKey]=="onRender") return;
                        //Se asocia la funcion al evento y se genera la vista después.
                        return nEvent[curKey] =  _.bind(mainObj[mainObj.events[mainObj]],mainObj);
                    }
                }
        },{});
        vOpts.events = BindedEvents;
    }
    // Model override
    vOpts.model = bmodel;
    
    // Override of dom element
    vOpts.el = options.selector;
    
    
    const View = new BBView(vOpts);

    // Generate template
    View['template'] = options.template === undefined ?
                     _.template(options.templateUrl):
                     _.template(options.template);


    // Owner
    View['owner'] = mainObj;
    // Set Render
    View.render = function(){
        //Pre render Event
        this.owner.preRender.call(this.owner);

        // Inner components render
        this.$el.html(this.template(_.extend(this.model,this.model.attributes)));

        // On render
        this.owner.onRender.call(this.owner);
        return this.model;
    };

    //Attend Model change event
    View.listenTo(bmodel,'change',View.render);
    
    return View;
} 

export class InnerComponent{

    private eventHandler = {};
    private components: InnerComponent[] = [];
    
    public model: BBModel;
    public view: Backbone.View<BBModel>;

    private OwnerComp = null;
    public selector;

    constructor(opts: ComponentOptions, parent?: any) {
        
        if(parent !== undefined) {
            this.OwnerComp = parent;
        }
        this.selector = opts.selector;
        // Create model
        this.CreateModel(opts);
        this.view = this.CreateView(parent, this.model, opts);
    }

    /**
     * @description Creates Model
     * @param options 
     */
    private CreateModel(options: ComponentOptions) {
        this.model = new BBModel();
        return this.model;
    }

    /**
     * @description
     * @param parent 
     * @param bmodel 
     * @param options 
     */
    private CreateView(parent: any,
        bmodel: Backbone.Model,
        options: ComponentOptions) {
    
        const vOpts: Backbone.ViewOptions<BBModel>={};
        
        
    
       // Events Override
        if( (parent!== undefined) && (parent['events']!==undefined)) {
            const BindedEvents =  _.allKeys(parent.events).reduce(
                function(pkey: any, curKey: string, i: number, nEvent: any){
                    if(typeof(parent.events[curKey])=='string'){
                        if(typeof(parent[parent.events[curKey]])=="function")
                        {
                            // On render event protection
                            if(parent.events[curKey]=="onRender") return;
                            //Se asocia la funcion al evento y se genera la vista después.
                            return nEvent[curKey] =  _.bind(parent[parent.events[parent]],parent);
                        }
                    }
            },{});
            vOpts.events = BindedEvents;
        }
        // Model override
        vOpts.model = bmodel;
        
        // Override of dom element
        vOpts.el = options.selector;
        
        
        const View = new BBView(vOpts);
    
        // Generate template
        View['template'] = options.template === undefined ?
                         _.template(options.templateUrl):
                         _.template(options.template);
    
    
        // Owner
        
        View['owner'] = this;
        View['callOwn'] = function(funct:string) {
            if(this.owner[funct]!==undefined)
            this.owner['funct'].call(this.owner);
        }
        // Set Render
        View.render = function(){
            //Pre render Event
            this.callOwn('preRender');
    
            // Inner components render
            this.$el.html(this.template(_.extend(this.model,this.model.attributes)));
    
            // On render
            this.callOwn('onRender');
            
            return this.model;
        };
    
        //Attend Model change event
        View.listenTo(bmodel,'change',View.render);
        
        return View;
    } 

    Init() {
        // Generate 
        this.eventHandler = _.extend(this.eventHandler,Backbone.Events);

    }

    render() {
        this.view.render();
    }

    Destroy() {
        this.components.map((c)=>{ c.Destroy.call(c); });
        this.view.remove();
    }
}