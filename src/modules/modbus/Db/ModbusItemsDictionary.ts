import { CustomValues } from "../../modbus/Db/CustomValues";
import { ModbusOnline , ModbusHolding, ModbusItem } from "./ModbusItem";
import ModbusUtils from "../utils/modbusutils";

/**
 * @desc Online Registers Dictionary Gestor
 *      gets info about all onlines
 */

export class ModbusItemsDictionary{
    ///Variables
    mOnlines:ModbusItem[];
    mCvalues:CustomValues;
    mCategories:any;
    mCatList:string[];
    /**
     * @description constructor:
     */
    public constructor(items:ModbusItem[],cvalues:CustomValues)
    {
        this.mOnlines = items;
        this.mCvalues = cvalues;
        this.mCategories={};
        this.mCatList=[];
        this.PopulateCategories();
    }

    private PopulateCategories()
    {
        for(let online of this.mOnlines)
        {
            if(typeof(this.mCategories[online.cat])=='undefined')
            {
                this.mCategories[online.cat] = [];
                this.mCatList.push(online.cat);
            }
            this.mCategories[online.cat].push(online);
        }
    }
    
    /**
     * @description Gets a list of categories
     */
    public GetCategories()
    {
        return this.mCatList;
    }
    /**
     * @description Get Online list by category
     */
    public GetOnlinesByCat(cat:string)
    {
        if(typeof(this.mCategories[cat])!='undefined')
        {
            return this.mCategories[cat];
        }
        return null;
    }
    /**
     * Get list of all ModbusOnline[]
     */
    public GetOnlines():ModbusItem[]{
        return this.mOnlines;
    }

    /**
     * @description Finds Online Description by address and start bit
     */
    public GetOnline(add:number,sb:number):ModbusItem
    {
        let cur = _.find(this.mOnlines,function(o){
            return (o.add==add) && (o.start==sb)
        });

        return cur;
    }
    /**
     * @description Finds Online Description by address and start bit
     */
    public GetValue(add:number,sb:number,value:number):string
    {
        
        let cur = _.find(this.mOnlines,function(o){
            return (o.add==add) && (o.start==sb)
        });
        if(this.mCvalues.IsCustom(cur.ty,value))
        {
            console.log("is custom");
            let retcval = this.mCvalues.Get(cur.ty,value);
            if(retcval!=null) return retcval;
            else{
                return value.toString()+" (It is a custom type: value not found!)";
            }
        }
        if(cur.of!=null)
        {
            return ModbusUtils.Format(value,cur.of,cur.ty);
        }
        
        return value.toString();
    }
}

export { ModbusOnline , ModbusHolding, ModbusItem } from "./ModbusItem";