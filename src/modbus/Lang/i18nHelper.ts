export class i8nHelper{
    
    static instance:i8nHelper;
    static lang:string;
    public Inst(lang:string)
    {
        if((i8nHelper.instance==undefined) || (i8nHelper.lang!=lang))
        {
            i8nHelper.instance = new  i8nHelper(lang);
            i8nHelper.lang=lang;
        }
        return i8nHelper.instance;
    }

    constructor (lang:string)
    {
        //Temporalmente cogemos el Dictionary (en web tedrá que ser o una inyección o una petición)

    }

    public Get(key:string,...rest:any[]) :string{
        return key;
    }
}