// import $ from "jquery";
import * as Backbone from "backbone";
import * as _ from "underscore";
// import _ from "underscore";
import { menu_view } from "./view/menu_view.tplt";
import { submenuview } from "./view/submenuview.tplt";
import { menuItemView } from "./view/menuItemView.tplt";
import * as backbonemod  from "../bbmodule/bbmodule";
import * as b from "../bbmodule/bmodule"; 
import messagebus from "../messagebus/messagebus";
 

/*


*/
 
    export interface MenuItem{
        url:string;
        module:backbonemod.BModule;
        icon:string;
        text:string;

    }

    interface InnerMenuItem{
        url:string;
        basepath:Array<string>;
        icon:string;
        module:backbonemod.BModule;
        text:string;
        childs:Array<InnerMenuItem>;
    }

    
    export class MenuModule{
        public Items:Array<InnerMenuItem>;
        static instance:MenuModule;
        
        bRouter:any;
        public static GetInstance(){
            if(MenuModule.instance==null)
            {
                MenuModule.instance = new MenuModule();
            }
            return MenuModule.instance;
        }

        constructor()
        {
            this.Items = new Array<InnerMenuItem>();
        
        }


        public static addItem(item:MenuItem)
        {
            MenuModule.GetInstance()._addItem(item);
            
        }

        public static render(selector:string)
        {
           return MenuModule.GetInstance()._render();
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
                inner = _.template(submenuview)({submenu:inner,text:Item.text,route:''});
                return inner;//console.log(inner);
            }
           // inner="";  
            let output = _.template(menuItemView)({text:Item.text,childs:inner,route:''});
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
                    basepath:item.url.split('/'),
                    icon:item.url,
                    module:item.module,
                    text:item.text,
                    childs:new Array<InnerMenuItem>()
                });
            }
            else{
                let parent = this.findParentNode(basep,this.Items);
                parent.childs.push({
                    url:item.url,
                    basepath:item.url.split('/'),
                    icon:item.url,
                    module:item.module,
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

   


