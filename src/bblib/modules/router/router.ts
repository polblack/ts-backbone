import * as Backbone from "backbone";
import * as _ from "underscore";

 

export interface RouteInsert{
    path:string;
    module:any;
    ul:string; //User level!!!
}
 

export interface Routes{
    routers:Route[]
} 

export interface Route{
    path:string;
    
}

export interface RouteTreeItem{
    basepath:string[];
    childs:RouteTreeItem[];
    module:any;
    ul:string; //User level!!!
    
}


 
export enum eRoutingMode{ Backbone = 0, Default=1}

/**
 * router de backbone 
 */
export class RouterModule{
    
    //Main instance
    static instance:RouterModule = new RouterModule();

    //Configuration:
    public RoutingMode:eRoutingMode = eRoutingMode.Default;

    //Saved routes
    iRoutes:RouteInsert[]=[];
    //Route Tree
    iRouteTree:RouteTreeItem[]=[];


    //SetupRoutes
    Add(routes:RouteInsert[])
    {
        for(let route of routes)
        {
             AddRouteToTree(route);
        }
    }
    /**
     * adds a route to tree
     */
    AddRouteToTree(route:RouteInsert){
            let basep = route.path.split('/');// basep.pop();
            if(basep.length==1)
            {
                //It is a base Item
                this.Items.push({
                    basepath:route.path.split('/'),
                    icon:item.url,
                    module:item.module,
                    childs:new Array<RouteInsert>()
                });
            }
            else{
                let parent = this.findParentNode(basep,this.Items);
                parent.childs.push({
                    basepath:item.path.split('/'),
                    module:item.module,
                    childs:new Array<RouteInsert>()
                });
            }
    }

    /**
     * Find a item internally
     */
    private findParentNode(basepath:Array<string>,Items:Array<RouteTreeItem>):RouteTreeItem
    {
        let i:number=0;
        
        
        let ret:RouteTreeItem = this._findParentNode(i,basepath,Items);
        return ret;                 
        
    }

    private _findParentNode(i:number,basepath:Array<string>,Items:Array<RouteTreeItem>):RouteTreeItem
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
    /**
     * Gets routes for launching on a menu or button
     */
    public GetRoutesLaunchers():string[]{
        let ret:string[]=[];
        for(let route of this.iRoutes)
        {
            ret.push(route.path)
        }

        return ret;
    }

    /**
     * @description Route launch
     */
    public Launch(routepath:string)
    {
        let route:RouteInsert = _.find(this.iRoutes,function(r){return r.path==route.path;});
        if(route != undefined)
        {
            if(typeof(route.component['Init'])!='undefined')
            {
                route.component['Init']();
            }
        }
    }


    ///Insert For root. Cleans all routes and generates new routes
    static forRoot(routes:RouteInsert[])
    {
        RouterModule.instance.iRoutes=routes;
    }

    bbroutes:Backbone.Router;
    /////////////////Backbone Routing 
    SetupBackboneRoutes(routes:RouteInsert[])
    {
        this.bbroutes = new Backbone.Router();
        for(let route of routes)
        {

        }
        
    }

    /////////////////Backbone Routing

}