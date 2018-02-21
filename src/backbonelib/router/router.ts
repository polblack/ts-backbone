import * as $ from "jquery";
import * as Backbone from "backbone";
import * as _ from "underscore";
import { UserLevel } from "../ulevel/userlevelmodule";
import ComponentFactory from "../component/component.factory";
import { debug } from "../log/debug";
import { messagebus } from "../messagebus/messagebus";

export interface RouteInsert{
    path:string;
    module:any;
    ul:UserLevel; //User level!!!
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
    moduledef:any; //Construction definition of module/component
    module:any; ///Constructed Module
    ul:UserLevel; //User level!!!
    launched: boolean,
    routed?: boolean,
    parent: RouteTreeItem
    
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
    
    mCurrentModule:any;

    //Current Route (current launched route)
    mCurrRoute:string=""; //Inital route is home


    //Saved routes
    iRoutes:RouteInsert[]=[];
    // Current Route Tree
    iRouteTree:RouteTreeItem[]=[];

    //Backbone Router
    bbroutes:Backbone.Router = new Backbone.Router();

    isBackboneRouted:boolean = false;
  


    public static SetBackboneRouting()
    {
        //debug.log("router: Set backbone route");
        RouterModule.instance.isBackboneRouted=true;
    }
    


    constructor()
    {
        this.isBackboneRouted = true;
        this.mCurrentModule=null;
        this.iRouteTree.push(this.GenerateEmptyRouteItem(['']));
    }

    //SetupRoutes
    public AddRouters(routes:RouteInsert[])
    {
        routes.map(this.AddRoute,this);
        
        if(this.isBackboneRouted)
        {
            this.SetupBackboneRoutes(routes);
        }
    }
    /**
     * adds a route to tree
     */
    public AddRoute(route:RouteInsert){
            /// Set up a / in root
            const spath = ((/^\//).test(route.path) ? route.path: '/'+route.path);
            let basep = route.path.trim()==='' ? [''] : spath.split('/');// basep.pop();
            this.AddRouteRecursive(route,this.iRouteTree[0]);
            
    }

    private GenerateEmptyRouteItem(path:string[]): RouteTreeItem {
        return {
            basepath:path,
            moduledef:null,
            module:null,
            childs:new Array<RouteTreeItem>(),
            ul : 0,
            parent: null,
            launched : false
        }
    }

    private filterByPath(path:string[]) {
        return function(it: RouteTreeItem) {
            return path.join('-') === it.basepath.join('-');
        }
    }

   

    /**
     * @desc Add Route Recursively
     *       Goes throug all Tree to Generate New element, if does not exist base parent generates a null one
     */
    private AddRouteRecursive(route:RouteInsert,routeNode:RouteTreeItem, i?: number, parent?: RouteTreeItem)
    {

        let basep = route.path.split('/');
        i = (i !== undefined) ? i : 1;
        if ( route.path === routeNode.basepath.join('/') ) {
            //Same route
            routeNode.moduledef = route.module,
            routeNode.ul = route.ul;
            routeNode.parent = parent;
            return;
        }
        
        const childRoutes = routeNode.childs.filter(this.filterByPath(basep.slice(0,i)));
        if(childRoutes.length === 0) {
            
            routeNode.childs.push(this.GenerateEmptyRouteItem(basep.slice(0,i)));
            this.AddRouteRecursive(route,routeNode.childs[0],i,routeNode);
        } else {
            //It is a parent
            this.AddRouteRecursive(route,childRoutes[0],i+1);            
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
        const foundList = Items.filter(this.filterByPath(basepath));

        for(let item of Items)
        {
            
            if((item.basepath[i]==basepath[i])
                && (item.basepath.length < basepath.length))
            { //Is a child node
                if(item.basepath.length == basepath.length-1) return item;
                i++;

                let ret:RouteTreeItem = this._findParentNode(i,basepath,item.childs);
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
        
        if(this.isBackboneRouted)
        {
        
            this.bbroutes.navigate(route,{trigger:true, replace: true});
        }
        else{
            route = /^\//.test(route) ? route : '/'+route;
            //Seek of last route and see if it has parents to load
            //Params will be given by /(key):param
            let routes = route.split('/'); 
            this._navigate(routes,this.iRouteTree,options);
        }
        

    }
   
     /**
     * @description Finds a item by path 
     * @param item : RouteTreeItem[]
     * @param pathsplit string[]
     * @param i : counter
     */
    private findPathItem(item: RouteTreeItem[], pathsplit: string[],  i?:number) : RouteTreeItem {
        
        
        const count = pathsplit.length;
        if(item.length === 0 ) return null;
        i = (i === undefined ) ? 1 : i;
        const subpath = pathsplit.slice(i-1,i);
        const found = item.filter(this.filterByPath(subpath));
        
        if(found.length === 0) {
            return null;
        } else {
            if ( i === ( pathsplit.length ) ) {
                return found[0];
            }
            return this.findPathItem(found[0].childs, pathsplit, i+1);
        }
    }

    /**
     * @description Finds an Path Item by path
     * @param path : string[]
     */
    private getPathItems(path:string[]) : RouteTreeItem[] {
        let lastElement = this.findPathItem(this.iRouteTree,path);
        let items = [ ];
        if(lastElement === null) return [];
        while(lastElement.parent !== undefined) {
            items.push(lastElement);
            lastElement = lastElement.parent;
        }
        items.push(lastElement);
        return items.reverse();
    }

    private intersect(root: RouteTreeItem[], from: RouteTreeItem[]) {
        let ret: RouteTreeItem[] = [];
        const max = root.length > from.length ? from.length : root.length;
        for(let i=0; i < max; i++) {
            if((root[i].basepath.join() === from[i].basepath.join())) {
                ret.push(from[i]);
            }
        }
        return ret;
         
    }

    /**
     * @description Inner navigation
     */
    private _navigate(routes:string[],iroutes:RouteTreeItem[],options:any)
    {
        
        let base=[];
        const launched = this.getPathItems(this.mCurrRoute.split('/'));
        const toLaunch = this.getPathItems(routes);
        const intersect = this.intersect(launched, toLaunch);
        if(launched.length > intersect.length) {
            launched.slice(intersect.length-1,launched.length-1).map((mod)=>{
                console.log("Destroying "+mod.module.NAME);
                mod.module.Destroy();
                mod.launched = false;
            });
        }

        /// Making navigation
        toLaunch.map((itm)=>{
            this._navigateTreeItem(itm,options);
        });
         
        this.mCurrRoute = routes.join('/');

        messagebus.instance().trigger("router:routed",routes.join("/"));

    }
    
    /**
     * @description Navigate by recursion
     */
    protected _navigateTreeItem(iRItem:RouteTreeItem,options:any)
    {
        if(iRItem.launched) {
            return;
        }
        if( iRItem.module !== undefined )
        {
            //Tenemos un módulo, que hay que generar (si está generado no se genera)
            if(iRItem.module === null)
            {
                if(iRItem.moduledef!=null)
                iRItem.module = new iRItem.moduledef();
            }

            if(iRItem.module!=null)
            {

                iRItem.launched = true;
                const routerContainer = $("backbone-router");
                if(routerContainer.length > 0) {
                    routerContainer.html('<'+iRItem.module.selector+'></'+iRItem.module.selector+'>');
                    ComponentFactory.instance.render(routerContainer);
                }
                else{
                    ComponentFactory.instance.render();
                }
            }
        }
    }

    protected _routeModule(comp: RouteTreeItem) {
        if( comp.childs.length === 0) {
            /// Render bootstrap component
            $("backbone-router").html('<'+comp.module.selector+'></'+comp.module.selector+'>');
        }
    }

    protected _routeComponent(comp: RouteTreeItem) {
        $("backbone-router").html('<'+comp.module.selector+'></'+comp.module.selector+'>');

    }

    /**
     * @description: checks if routes array are params routes from first , 
     * @return: if no returns false, else returns params array
     */
    protected _routeParams(routes:string[]):string[]
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
            return params;

        }

        return [];
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


    ///Insert For root. Cleans all routes and generates new routes
    static forRoot(routes:RouteInsert[])
    {
        RouterModule.instance.iRoutes=routes;
    }

  
    /////////////////Backbone Routing 
    SetupBackboneRoutes(routes:RouteInsert[])
    {
        
        for(let route of routes)
        {
            let name = route.path.replace(this._routeParams(route.path.split('/')).join('/'),'');
            this.bbroutes.route(route.path,name,_.bind(function(){
                 const ipath = /^\//.test(route.path) ? route.path: '/'+route.path;
                 let routes = ipath.split('/'); 
                 this._navigate.call(this, routes,this.iRouteTree,{});

            },this));
        }
        
    }

    /////////////////Backbone Routing

}