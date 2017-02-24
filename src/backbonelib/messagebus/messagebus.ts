import { bmodule } from "../bbmodule/bmodule";

@bmodule( {

    })
export class messagebus extends Backbone.Events{
    static bus: any;
    public static instance(){
        if(messagebus.bus==null)
        {
            messagebus.bus ={};
            _.extend(messagebus.bus,Backbone.Events);
        }
        return messagebus.bus;
    }
     
    


}

