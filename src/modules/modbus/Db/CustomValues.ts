import * as i18n from "../Lang/i18nHelper"

export class CustomValueItem{

}
/**
 * Custom Values
 */
export class CustomValues{

    protected mDictionary:any;
    protected cDictionary:any;
    /**
     * formato esperado de los values:
     *  val = [{type:<type>,values: [<array de valores>]}]
     * 
     *      [valor]={value,langentry(para traducir)}
     */
    public constructor(dictionary:any)
    {
        this.mDictionary = dictionary;
    }
      public IsCustom(key:string,value:number):boolean{
        let svalue = value.toString();
        if(typeof(this.mDictionary[key])!='undefined'){
             return true;
        }
        return false;
    }
     /**
      * @desc  Get Value Traducido
      */
    public Get(key:string,value:number):string{
        let svalue = value.toString();
        // console.log(this.mDictionary);
        // console.log("loading key "+ key);
        if(typeof(this.mDictionary[key])!='undefined'){
            // console.log("key exists ");
            // console.log("value is ");
            if(typeof(this.mDictionary[key]['values'][svalue])!='undefined')
            {
                // console.log("value exists");
                //Traducimos
                let ret = i18n.i8nHelper.Inst().Get(this.mDictionary[key]['values'][svalue]);
                // console.log(ret);
                if(ret!=null) return ret;
                return svalue;
            }
        }
        return null;
    }


}
