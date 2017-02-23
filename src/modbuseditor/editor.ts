// import * as Modbus from "../modbus/Db/ModbusItem";
import { BModule } from "../bblib/modules/bbmodule/bbmodule";
import * as menu from "../bblib/modules/menu/menumodule";
import { index } from "./view/index.tplt";
// import * as $ from "jquery";
// import * as _ from "underscore";
import bblib from "../bblib/bblib";
import { RouterModule } from "../bblib/modules/router/router";
import { TestModule } from "./test/testmodule";
///Start executing:
 
let module = new TestModule(); 

let OoMenuModule:menu.MenuModule = menu.MenuModule.GetInstance();
let BModule1 = new BModule("moduloe 1");
let BModule2 = new BModule("moduloe 2");
let BModule3 = new BModule("moduloe 3");
//Add item 1
OoMenuModule.addItem({
    url:"home",
    icon:"",
    text:"home"
});
OoMenuModule.addItem({
    url:"home/child",
    icon:"",
    text:"child"
});
OoMenuModule.addItem({
    url:"home/ole", 
    icon:"",
    text:"secondchild"
});
 
let router:RouterModule = new RouterModule();
///RouterModule
//Add item 1
/* path:string;
    module:any;
    ul:string; //User level!!!*/
router.AddRoute({
    path:"home",
    module:BModule1,
    ul:"basic"
});
router.AddRoute({
    path:"home/child",
    module:BModule2,
    ul:"basic"
});
router.AddRoute({
    path:"home/ole",
    module:BModule3,
    ul:"basic"
});
  
 

//Start 
// $('#main').html(_.template(index)());

// let menustr = OoMenuModule.render('#menu'); 
 
// $('#menu').html( menustr);
// bblib.messagebus;

