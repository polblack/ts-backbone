
/// <reference path="./ModbusType.ts" />
// import * as Modbus from "../Db/ModbusItem";
// import * as i18n from "../Lang/i18nHelper"

// namespace ModbusTypes{
//     export class NumericType extends ModbusType {

      
//         public constructor (item:Modbus.ModbusItem,lang:i18n.i8nHelper){ super(name,lang); }
//         /**
//          * Validate:
//          * @param: value
//          * @return: false is not valid
//          */
//         public Validate(value:number):boolean{
//             if((value > this.mItem.max) || (value < this.mItem.min)){
//                 this.ValidationError= this.lang.Get("mtypes.numeric.notbetween",value,this.mItem.max,this.mItem.min);
//                 return false;   
//             }
            
//             return true;
//         }
//         /**
//          * Set: sets value and validates
//          */
//         public Set(value:number):boolean{
//             if(!this.Validate(value)) return false;
//             this.value=value;
//             return true;
//         }
//         /**
//          * Get, retrieves values
//          */
//         public Get():number{
//             return this.value;
//         } 
         
        
//     }
// }