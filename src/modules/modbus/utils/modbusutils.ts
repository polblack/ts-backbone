/**
 * @desc Modbus utilities
 * 
 */


class ModbusUtils{
    /**
     * @description Prints out formated element
     */
    public static Format(value:number,format:string,type:string):string{
        let formatMatch = /([fdhb])(\(.\))?/i.exec(format);
        if(formatMatch==null) return value.toString();
        console.log(formatMatch);
        switch(formatMatch[1]){
            case "f"://Floating
                let prec:number = 3;
                if(formatMatch.length>2){

                    prec = parseInt(formatMatch[2].replace(/\(/,'').replace(/\)/,''));
                }
                if(value==1) prec=1; //No entiendo muy bien cómo funciona esto, pero vale
                console.log("Format F found precision: "+(prec));
                return value.toPrecision(prec+2);
            case "h":
                return "0x"+
                    ModbusUtils.padLeft(
                        value.toString(16).toUpperCase(),
                        ModbusUtils.TypeSizeBytes(type)*2,
                        '0'
                    )
                    ;
            case "b":
                {
                    let ret="";
                    let sbits = ModbusUtils.TypeSizeBits(type);
                    let out=[];
                    let bvalue = value;
                    for(let i=0; i < sbits;i++)
                    {
                       out.unshift( ((bvalue & 1) == 1)?"1":"0");
                       bvalue = bvalue >> 1;
                        
                    }
                    return "b"+out.join("");
                }
               
        }
        //return value.toExponential();
        return value.toString();

    }

    static sizedict =[{
        "short":16,
        "int":32,
        "long":64
    }];
    /**
     * @description Pad left a string
     * @param nr : input
     * @param n: number of elements to pad
     * @param str: padding string
     */
    public static padLeft(nr, n, str){
        
        return Array(n-String(nr).length+1).join(str||'0')+nr;
    }
    /**
     * @description Gets type size in bits (f.e: uint = 32)
     */
    public static TypeSizeBits(type:string):number
    {
        type=type.toLowerCase();
        if(type=="arraypuntoxy") return 32;
        type = type.replace(/^u/i,'');//eliminamos la parte de unsigned, no esnecesario
        console.log("el tipo que vamos a hacer es: "+type);
        let regNum = /[a-z]*([0-9]*)/i;
        if(regNum.test(type))
        {
            console.log(regNum.exec(type)[1]);
            console.log(parseInt(regNum.exec(type)[1]));
            return parseInt(regNum.exec(type)[1]);
        }
        if(typeof(ModbusUtils.sizedict[type])!='undefined')
        {
            return ModbusUtils.sizedict[type];
        }
        throw new Error("Wrong type defintion: "+type+"!");
    }
    /**
     * @description Gets type size in bytes
     */
    public static TypeSizeBytes(type:string):number
    {
        return ModbusUtils.TypeSizeBits(type)/8;
    }

}

export default ModbusUtils;