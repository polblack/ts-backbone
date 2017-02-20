import * as i18n from "../Lang/i18nHelper"

export class CustomValueItem{

}
/**
 * Custom Values
 */
export class CustomValues{

    protected mDictionary:any;

    /**
     * formato esperado de los values:
     *  val = [{type:<type>,values: [<array de valores>]}]
     * 
     *      [valor]={value,langentry(para traducir)}
     */
    public constructor(valuesDictionary:any,lang:i18n.i8nHelper)
    {
        this.mDictionary = [];
        for(let val of valuesDictionary)
        {
           this.mDictionary[val['type']]=[];
           for(let value of val['values'])
           {
               
           }

        }
    }
}
