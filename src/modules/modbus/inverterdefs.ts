import { ModbusOnline , ModbusHolding } from "../modbus/Db/ModbusItem";

export interface InverterModubsInfo{
    online:ModbusOnline[],
    holding:ModbusHolding[],
    data:any[],
    langs:any,
    customtypes:any


}
export { ModbusOnline , ModbusHolding, ModbusItem } from "../modbus/Db/ModbusItem";

export { ModbusItemsDictionary } from "./Db/ModbusItemsDictionary";