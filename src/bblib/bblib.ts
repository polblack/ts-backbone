 import messagebus from "./modules/messagebus/messagebus";


class bblib{
    public static messagebus:messagebus; 
}

bblib.messagebus = new messagebus();


export default bblib;