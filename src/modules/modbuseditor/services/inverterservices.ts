/**
 * Servicios de acceso a los datos de la web.
 * Se puede generar un MOCK para hacer test
 * 
 */
import { ModbusOnline , ModbusHolding ,InverterModubsInfo } from "../../modbus/inverterdefs";
import MockInfo from "./mock/mock.enum";
 


import * as ModbusTypes from "../../modbus/types/ModbusType"

export class InverterDefService{

    static instance: InverterDefService = new  InverterDefService();

    info:InverterModubsInfo=MockInfo;

    public GetOnline():ModbusOnline[]{
        let online:ModbusOnline[];
        online =  this.info.online;
        return online;
    }

    public GetHolding():ModbusHolding[]{
        let holding:ModbusHolding[];
        holding =  this.info.holding;
        return holding;
    }

    public GetLangs():any{
        return this.info.langs;
    }
    public GetCustomTypes():any{
        return this.info.customtypes;
    }
}


export { ModbusOnline , ModbusHolding } from "../../modbus/Db/ModbusItem";
