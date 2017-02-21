// import * as Modbus from "../modbus/Db/ModbusItem";
import { BModule } from "../bblib/modules/bbmodule/bbmodule";
import * as menu from "../bblib/modules/menu/menumodule";
import { index } from "./view/index.tplt";
// import * as $ from "jquery";
// import * as _ from "underscore";
import bblib from "../bblib/bblib";
///Start executing:

let OoMenuModule:menu.MenuModule = menu.MenuModule.GetInstance();
let BModule1 = new BModule("moduloe 1");
let BModule2 = new BModule("moduloe 2");
let BModule3 = new BModule("moduloe 3");
//Add item 1
menu.MenuModule.addItem({
    url:"home",
    module:BModule1,
    icon:"",
    text:"home"
});
menu.MenuModule.addItem({
    url:"home/child",
    module:BModule1,
    icon:"",
    text:"child"
});
menu.MenuModule.addItem({
    url:"home/child/tree",
    module:BModule3,
    icon:"",
    text:"secondchild"
});
menu.MenuModule.addItem({
    url:"BModule3",
    module:BModule3,
    icon:"",
    text:"BModule3"
});

console.log(menu.MenuModule.instance.Items);
//Start 
$('#main').html(_.template(index)());

let menustr = menu.MenuModule.render('#menu'); 
 
$('#menu').html( menustr);
bblib.messagebus;

