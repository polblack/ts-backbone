import * as Backbone from "backbone";
import * as _ from "underscore";

 

export interface RouteInsert{
    path:string;
    component:any;
    ul:string; //User level!!!
}
 

export interface Routes{
    routers:Route[]
} 

export interface Route{
    path:string;
    
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
    //SetupRoutes
    Add(routes:RouteInsert[])
    {
        for(let route of routes)
        {
            if(_.findIndex(this.iRoutes,function(r){return r.path==route.path;})==-1)
            {
                this.iRoutes.push(route);
            }
        }
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