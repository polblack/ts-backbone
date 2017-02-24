import { component, ComponentBase } from "../../../backbonelib/core";
import { onlinelist } from "./onlinelist.tplt";

/**
 * Componente de mostrado de Online registers
 */
@component({
     templateUrl:onlinelist,
     selector:"modbusonlineslist"
})
export class OnlinesListComponent extends ComponentBase {
        public Init(){

        }
}