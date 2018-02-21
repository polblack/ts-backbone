// import $ from "jquery";
import * as Backbone from "backbone";
// import _ from "underscore";
import { menu_view } from "./view/menu_view.tplt";
import { submenuview } from "./view/submenuview.tplt";
import { menuItemView } from "./view/menuItemView.tplt";
 
import { messagebus } from "../../messagebus/messagebus";

import { UserLevel } from "../../ulevel/userlevelmodule";
import { debug } from "../../log/debug";

import { RouterModule } from "../../router/router";


export interface MenuOptions{
    selector:string,
    type:string
}
/*


*/
 
    export interface MenuItem{
        url:string;
        ulevel?:UserLevel; 
        icon?:string;
        iclass?:string,
        text:string;

    }

    interface InnerMenuItem{
        url:string;
        basepath:Array<string>;
        icon:string;
        iclass:string;
        ulevel:UserLevel; 
        text:string;
        childs:Array<InnerMenuItem>;
    }

    
    export class MenuUi{
        public Items:Array<InnerMenuItem>;
        // static instance:MenuModule;
        options:MenuOptions;
        bRouter:any;
        // public static GetInstance(options:MenuOptions){
        //     if(MenuModule.instance==null)
        //     {
        //         MenuModule.instance = new MenuModule(options);
        //     }
        //     return MenuModule.instance;
        // 

        eventHandler:any;

        constructor(opts:MenuOptions)
        {
            //Cazamos el ?redirect y nos lo quedamos para pintarlo
            

            this.options = opts;
            this.Items = new Array<InnerMenuItem>();
            this.eventHandler = {};
            _.extend(this.eventHandler,Backbone.Events);
            
            this.eventHandler.listenTo(messagebus.instance(),"router:routed",_.bind(function(route){
                this.SelectRoute(route);
            },this));
        }

        private SelectRoute(route:string)
        { 
            $(this.options.selector).find('a').each(function(el){
                let $el=$(this);
                let urlP=$el.attr('data-bb-url');
                
                if(urlP)
                {
                    if(urlP==route)
                    {
                        $el.addClass('active');
                    }
                    else{
                     $el.removeClass('active');
                    }
                }
               
            });
        } 


        public addItem(item:MenuItem)
        {
            this._addItem(item);
            
        }

        public render()
        {
        
           return $(this.options.selector).html( this._render());
        }

        private _render( )
        {
            let renderText:string="";
            return _.template(menu_view)({menu:this._renderItems(this.Items)});
             
        }
        private _renderItems(Items:Array<InnerMenuItem>)
        {
            let renderText:string="";
            for(let item of Items)
            {
                renderText=renderText+this._renderItem(item);
                
            }
            return renderText;
        }
        private _renderItem(Item: InnerMenuItem)
        {
            let inner = Item.childs.length>0?this._renderItems(Item.childs):"";
            if(inner!==""){
                inner = _.template(submenuview)(_.extend(Item,{submenu:inner,text:Item.text,route:''}));
                return inner;//console.log(inner);
            }
           // inner="";  
            let output = _.template(menuItemView)(_.extend(Item,{submenu:inner,text:Item.text,route:''}));
            return output; 
        }
        /**
         * Add a item internally
         */
        private _addItem(item:MenuItem)
        {
            let basep = item.url.split('/');// basep.pop();
            if(basep.length==1)
            {
                //It is a base Item
                this.Items.push({
                    url:item.url,
                    ulevel:(typeof(item.ulevel)!='undefined')?item.ulevel:UserLevel.Basic,
                    basepath:item.url.split('/'),
                    icon:typeof(item.icon!='undefined')?item.icon:'',
                    iclass:typeof(item.iclass!='undefined')?item.iclass:'',
                    
                    text:item.text,
                    childs:new Array<InnerMenuItem>()
                });
            }
            else{
                let parent = this.findParentNode(basep,this.Items);
                parent.childs.push({
                    ulevel:(typeof(item.ulevel)!='undefined')?item.ulevel:UserLevel.Basic,
                    url:item.url,
                    basepath:item.url.split('/'),
                    icon:typeof(item.icon!='undefined')?item.icon:'',
                    iclass:typeof(item.iclass!='undefined')?item.iclass:'',
                    text:item.text,
                    childs:new Array<InnerMenuItem>()
                });
            }
        } 
         

        /**
         * Find a item internally
         */
        private findParentNode(basepath:Array<string>,Items:Array<InnerMenuItem>)
        {
            let i:number=0;
            
            
                let ret:InnerMenuItem = this._findParentNode(i,basepath,Items);
                 return ret;                 
            
        }

        private _findParentNode(i:number,basepath:Array<string>,Items:Array<InnerMenuItem>)
        {
            for(let item of Items)
            {
                
                if((item.basepath[i]==basepath[i])
                    && (item.basepath.length < basepath.length))
                    { //Is a child node
                        if(item.basepath.length == basepath.length-1) return item;
                        i++;

                        let ret:InnerMenuItem = this._findParentNode(i,basepath,item.childs);
                        return ret;
                    }
                 
            }
            return null;
        }
        
    }

   


