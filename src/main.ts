import { debug } from "./backbonelib/log/debug";
//debug.EnableTags("router,module");


import MainModule from "./modules/main/main.module";
import * as _ from "underscore";
import { module, IModule } from "./backbonelib/core";
import { UserLevel } from "./backbonelib/ulevel/userlevelmodule";
import { RouterModule } from "./backbonelib/router/router";

///Establecemos el Backbone Routing
RouterModule.SetBackboneRouting();
//Backbone.history.start({pushState: true});


import { DashboardModule } from "./modules/dashboard/dashboard.module"; 
import { MainComponent } from "./modules/main/main.component";
import { NavigatorConsole } from "./backbonelib/log/navigator.console";


//NavigatorConsole.Enable(false);
// _.templateSettings = {
//   interpolate: /\{\{\{(.+?)\}\}\}/g,
//   escape:/\{\{(.+?)\}\}/g
//   ,evaluate: /<\%(.+?)\%>/g
// };


/**
 * MODULO Inicial
 */
@module({
    bootstrap:[MainComponent],
    routes:[
        
        {
            path:"home",
            module:MainModule,
            ul:UserLevel.Basic
        } 
         
    ]
})
class BootstrapModule {
    constructor() {
        
    }
    public Init() {
        console.log("bootstrap: Initialized");
    }
 

     
}

const main = new BootstrapModule();

console.log(main.constructor);

$(document).ready(function(){
    
    
    main['Run']();
    // main.Init();
    
     
    Backbone.history.start(); 
    debug.log("init: INITIALIZATION;");
    //NOTA: en caso de que tengamos un # se establece la ruta como ya iniciada, de manera que no se 
    //lanza la navegación a la página
    let NextPath = "";
    if(document.location.href.match('#')){
       NextPath = /#(.*)$/.exec(document.location.href)[1];
    } 
    
    RouterModule.instance.Navigate("home",null);
    if(NextPath!='')
    {
        RouterModule.instance.Navigate(NextPath,null);
    }
     
});

