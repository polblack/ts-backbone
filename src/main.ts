import { debug } from "./backbonelib/log/debug";
//debug.EnableTags("router,module");


import MainModule from "./modules/main/main.module";
import * as _ from "underscore";
import { module } from "./backbonelib/core";
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
            path:"",
            module:MainModule,
            ul:UserLevel.Basic
        } 
         
    ]
})
class BootstrapModule {
}

const main = new BootstrapModule();



$(document).ready(function(){
    
    

    Backbone.history.start(); 

    let NextPath = "";
    if(document.location.href.match('#')){
       NextPath = /#(.*)$/.exec(document.location.href)[1];
    } else {
       NextPath = '#dashboard';
    }

    RouterModule.instance.Navigate(NextPath,null);
    
     
});

