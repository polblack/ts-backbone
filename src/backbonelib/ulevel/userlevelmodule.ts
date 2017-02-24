//import { } from "../../backbonelib/messagebus"
import { EventModule } from "../../backbonelib/bbmodule/bmodule";
import { messagebus } from "../../backbonelib/core";
import * as Backbone from "backbone";

export enum UserLevel{ Basic = 0, Service = 1, Installer = 2, Ingeteam = 3 }
export const userchangemsg:string ="usr:change";

/**
 * @desc : modulo de Nivel de Usuario que establece qué niveles de usuario existen.
 *      emite un evento : usr:change cuando se modifica el nivel de usuario.
 * 
 */

export class UserLevelModule{
    
    ///Instance
    static instance = new UserLevelModule();
    //Current User level
    curlevel:UserLevel = UserLevel.Basic;

    public static GetUserLevelStr():UserLevel{
        return UserLevelModule.instance.curlevel;
    }
    public static SetUserLevelStr(usrlvl: UserLevel):void{
        UserLevelModule.instance.curlevel = usrlvl;
        messagebus.instance().trigger("usr:change",usrlvl);
    }
}

