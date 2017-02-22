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
    public AddRouters(routes:RouteInsert[])
    {
        for(let route of routes)
        {
             this.AddRoute(route);
        }
    }
    /**
     * adds a route to tree
     */
    public AddRoute(route:RouteInsert){
            let basep = route.path.split('/');// basep.pop();
            if(basep.length==1)
            {
                //It is a base Item
                this.RouteTreeItem.push({
                    basepath:route.path.split('/'),
                    icon:item.url,
                    module:item.module,
                    childs:new Array<RouteInsert>()
                });
            }
            else{
                let parent = this.findParentNode(basep,this.RouteTreeItem);
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

    ///Navigation
    /**
     * @description Navigate to given route
     */
    public Navigate(route:string,options:any)
    {
        //Seek of last route and see if it has parents to load
        //Params will be given by /(key):param
        let routes = route.split('/'); 
        this._navigate(routes,this.iRouteTree,options);

    }
   
    /**
     * @description Inner navigation
     */
    private _navigate(routes:string[],iroutes:RouteTreeItem[],options:any)
    {
        let base = routes.shift();
        for(let iRItem of iroutes)
        {
            if(iRItem.basepath==base){
                //This is the router item
                if(typeof(iRItem.module)!='undefined')
                {
                    if(typeof(iRItem.module['Init'])!='undefined')
                    {
                        let params = this._routeParams(routes);
                        if(params!==false){
                            iRItem.module['Init']();
                        }
                        else{
                            iRItem.module['Init'](params);
                            return;
                        }
                    }
                }
                this._navigate(routes);//Ejecutamos módulo a módulo
            }
            //Seguimos hasta el siguiente módulo

        }

    }
    /**
     * @description: checks if routes array are params routes from first , 
     * @return: if no returns false, else returns params array
     */
    private _routeParams(routes:string[])
    {
        if(/:/.test(routes[0]))
        {
            let params=[];
            //it has, so lets get all params
            for(let route of routes)
            {
                 if(/:/.test(route))
                 {
                     params.push(/:(.*)$/.exec(route)[1]);
                 }
            }

        }

        return false;
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