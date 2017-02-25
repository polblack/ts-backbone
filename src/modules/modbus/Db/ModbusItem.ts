import {UserLevel} from "../../../backbonelib/ulevel/userlevelmodule";
export interface ModbusItem{
    add:number;//Address
    start:number;//Start bit
    len:number;//Longitud
    tid:string,//identicador tipo
    ty:string,//Tipo de dato
    of:string,//Output format
    m:string,//Magnitude key
    cat:string,//Category key
    flgs:number, ///Flags
    sk:number,//String Kits
}

export interface ModbusOnline{
    add:number;//Address
    start:number;//Start bit
    len:number;//Longitud
    u:UserLevel,//User
    tid:string,//identicador tipo
    ty:string,//Tipo de dato
    of:string,//Output format
    m:string,//Magnitude key
    cat:string,//Category key
    flgs:number, ///Flags
    sk:number,//String Kits
}

export interface ModbusHolding{
    add:number;//Address
    start:number;//Start bit
    len:number;//Longitud
    ur:UserLevel,//User Read
    uw:UserLevel,//User Write
    min:number;//Minimum
    max:number; //Maximum
    tid:string,//identicador tipo
    ty:string,//Tipo de dato
    of:string,//Output format
    m:string,//Magnitude key
    cat:string,//Category key
    flgs:number, ///Flags
    sk:number,//String Kits
}

export interface CustomValues{
    
}

export interface CustomValueItem{
    
}