/**
 * 
 * @desc: Main component
 */

import { component } from "../../backbonelib/core";
import  main  from "./view/main.tplt.html";

@component({
    templateUrl:main,
    selector:"main",
    
})
export class MainComponent{
    
    events:any = {
        'click #menu1':"menu1click"
    };
    /**
     * click del menu
     */
    menu1click = function()
    {
         
    }
}