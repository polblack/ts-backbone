import * as Modbus from "../Db/ModbusItem";
import * as i18n from "../Lang/i18nHelper"
export namespace ModbusTypes{
    export abstract class ModbusType{
        
        protected value:any;
        protected mItem:Modbus.ModbusHolding;
        protected lang:i18n.i8nHelper;
        public constructor(item:Modbus.ModbusHolding,lang:i18n.i8nHelper)
        {
            this.mItem = item;
            this.lang = lang;
        }
        public abstract Set(value:number):boolean;
        public abstract Get():any;
        public abstract Validate(value:any):boolean;

        public ValidationError:string;
    }
    /**
     * Enum Type
     */
    export class EnumType extends ModbusType {
        public constructor (item:Modbus.ModbusHolding,lang:i18n.i8nHelper){ super(item,lang); }
        /**
         * Validate:
         * @param: value
         * @return: false is not valid
         */
        public Validate(value:number):boolean{
            if(value==0) return true;
            
            return true;
        }
        /**
         * Set: sets value and validates
         */
        public Set(value:number):boolean{
            console.log("Set "+value);
            if(!this.Validate(value)) return false;
            this.value=value;
            return true;
        }
        /**
         * Get, retrieves values
         */
        public Get():number{
            return this.value;
        } 
    }

/**
 * NumericType
 * Tipo numérico que tiene límites máximo y mínimo
 */
    export class NumericType extends ModbusType {

      
        public constructor (item:Modbus.ModbusHolding,lang:i18n.i8nHelper){ super(item,lang); }
        /**
         * Validate:
         * @param: value
         * @return: false is not valid
         */
        public Validate(value:number):boolean{
            console.log("item max"+this.mItem.max);
            if((value > this.mItem.max) || (value < this.mItem.min)){
                this.ValidationError= this.lang.Get("mtypes.numeric.notbetween",value,this.mItem.max,this.mItem.min);
                return false;   
            }
            
            return true;
        }
        /**
         * Set: sets value and validates
         */
        public Set(value:number):boolean{
            console.log("Set "+value);
            if(!this.Validate(value)) return false;
            this.value=value;
            return true;
        }
        /**
         * Get, retrieves values
         */
        public Get():number{
            return this.value;
        } 
         
        
    }
}