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
    //Route Tree
    iRouteTree:RouteTreeItem[]=[];

    //Backbone Router
    bbroutes:Backbone.Router = new Backbone.Router();

    isBackboneRouted:boolean = false;
  


    public static SetBackboneRouting()
    {
        debug.log("router: Set backbone route");
        RouterModule.instance.isBackboneRouted=true;
    }
    


    constructor()
    {
        this.mCurrentModule=null;
         
         
    }

    //SetupRoutes
    public AddRouters(routes:RouteInsert[])
    {
        for(let route of routes)
        {
            //  if(this.mCurrRoute!="") 
            //  {  //We are not on base route
            //     //Assign base Path to Route
            //     route.path = this.mCurrRoute+"/"+route.path;
            //  }
             
             this.AddRoute(route);
             
        }
        if(this.isBackboneRouted)
        {
            this.SetupBackboneRoutes(routes);
        }
        debug.log("router: Added Routesrs"); 
        debug.mlog("router",this.iRouteTree);
    }
    /**
     * adds a route to tree
     */
    public AddRoute(route:RouteInsert){
            let basep = route.path.split('/');// basep.pop();
            if(basep.length==1)
            {
                //It is a base Item
                this.iRouteTree.push({
                    basepath:route.path.split('/'),
                    moduledef:route.module,
                    module:null,
                    childs:new Array<RouteTreeItem>(),
                    ul : route.ul,
                    
                });
            }
            else{
                this.AddRouteRecursive(route,this.iRouteTree);
                
                
            }
    }

    /**
     * @desc Add Route Recursively
     *       Goes throug all Tree to Generate New element, if does not exist base parent generates a null one
     */
    private AddRouteRecursive(route:RouteInsert,Items:Array<RouteTreeItem>)
    {
        let basep = route.path.split('/');
        
        let longitude = basep.length;
        for(let i=0; i < longitude; i++)
        {
            let newbasep=[];
            for(let j=0; j < i+1; j++){newbasep.push(basep[j]);}
            
            debug.log("router: generating route "+newbasep.join('/'));
            let parent = this.findParentNode(basep,Items);
            if(parent==null){
                debug.log("router: has no parent "+newbasep.join('/'));
                //Generamos un padre VACIO!
                Items.push({
                    basepath:newbasep,
                    moduledef:null,
                    module:null,
                    childs:new Array<RouteTreeItem>(),
                    ul:route.ul
                });
                debug.log("router: generated new Items");
                debug.mlog("router",Items);
            }
            else{
                debug.log("router: YEAH has parent "+newbasep.join('/'));
                debug.mlog("router",parent);
                parent.childs.push({
                    basepath:route.path.split('/'),
                    moduledef:route.module,
                    module:null,
                    childs:new Array<RouteTreeItem>(),
                    ul:route.ul
                });
            }      
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
            debug.log("router: backbone routed to "+route);
            debug.mlog("router",this.iRouteTree);
            this.bbroutes.navigate(route,{trigger:true, replace: true});
        }
        else{
            //Seek of last route and see if it has parents to load
            //Params will be given by /(key):param
            this.mCurrRoute = route;
            let routes = route.split('/'); 
            debug.log("router: Navigating to "+route);
            this._navigate(routes,this.iRouteTree,options);
        }
        

    }
   
    /**
     * @description Inner navigation
     */
    private _navigate(routes:string[],iroutes:RouteTreeItem[],options:any)
    {
        
        let base=[];
        debug.log("router: routed to "+routes.join('/'));
        for(let i=0; i < routes.length;i++)
        {

            base.push(routes[i]);
            debug.mlog("router",iroutes);
            debug.log("router: Finding route "+base.join('/'));
            let Node = this._findNode(base.join('/'),iroutes);
            debug.mlog("router",Node);
            //Seguimos hasta el siguiente módulo
            this._navigateTreeItem(Node,options);
        }
        messagebus.instance().trigger("router:routed",routes.join("/"));

    }
    /** Searchs for node in an array */
    private _findNode(path:string,Items:Array<RouteTreeItem>):RouteTreeItem
    {
        let basepath = path.split('/');
        debug.log('router: _find Node '+path);   
        
        for(let item of Items)
        {
            if(item.basepath.length < basepath.length)
            {
                let isParent = true;
                for(let i=0; i < item.basepath.length;i++){
                    isParent = isParent && item.basepath[i]==basepath[i];
                }
                debug.log('router: is parent ?'+(isParent?"Yes":"no"));
                debug.mlog('router',item);
                if(isParent)
                {
                   return this._findNode(path,item.childs);
                }
            } 
            debug.log("router: item.basepath.length "+item.basepath.length+" == basepath.length "+basepath.length);
            if(item.basepath.length == basepath.length)
            {
                debug.log("router:lengths are equal!");
                  if(item.basepath.join('.')==basepath.join('.'))
                  {
                      //Is the same path return item;
                      debug.log("router: found tree item");
                      return item;
                  }  
            }
        }
        return null;
    }
    /**
     * @description Navigate by recursion
     */
    protected _navigateTreeItem(iRItem:RouteTreeItem,options:any)
    {
        debug.log("router: navigate to tree item");
        debug.mlog("router",iRItem);
        //This is the router item
        if(typeof(iRItem.module)!='undefined')
        {
            //Tenemos un módulo, que hay que generar (si está generado no se genera)
            if(iRItem.module==null)
            {
                if(iRItem.moduledef!=null)
                iRItem.module = new iRItem.moduledef();
            }

            if(iRItem.module!=null)
            {
                debug.log("router: launched module "+(iRItem.module['NAME']));
                debug.mlog("router",iRItem.module);

                if(typeof(iRItem.module['type'])!='undefined')
                {
                
                    //Si es un módulo
                    //if(iRItem.module['type']=='module')
                    {
                        
                        let ELNAME=( (typeof(iRItem.module['NAME'])!='undefined')?iRItem.module['NAME']:'');
                        
                        //Launched an generated module
                        debug.log("router: Launched and generated  "+iRItem.module['type']+' '+ ELNAME);

                        debug.log("router: selector for module "+iRItem.module['NAME']+' is '+iRItem.module['selector']);
                        //Insertamos el selector en el tag del router
                        debug.log("router: hay selector?"+$("backbone-router").length);
                        $("backbone-router").html('<'+iRItem.module['selector']+'></'+iRItem.module['selector']+'>');
                        ///Busca los nuevos elementos y los genera.
                        ComponentFactory.GetInstance().render();
                        
                        debug.log("router: Init of "+iRItem.module['type']+ " " + iRItem.module['NAME']);
                         
                        iRItem.module['Init']();
                    }
                    // if(iRItem.module['type']=='module'){
                    //     ComponentFactory.GetInstance().render();
                    // }
                    
                }
            }
        }
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
        let $this = this;
         
        for(let route of routes)
        {
            let name = route.path.replace(this._routeParams(route.path.split('/')).join('/'),'');
            this.bbroutes.route(route.path,name,_.bind(function(){
                 let routes = route.path.split('/'); 
                     debug.log("router: Navigating to route");
                     debug.mlog("router",this.iRouteTree);
                        
                     $this._navigate(routes,this.iRouteTree,{});

            },this));
        }
        
    }

    /////////////////Backbone Routing

}