 

export class i8nHelper{
    
    static instance:i8nHelper;
    lang:string;
    dict:any;
    seldict:any;
    public static Inst()
    {
        if((i8nHelper.instance==undefined))
        {
            i8nHelper.instance = new  i8nHelper();
          
        }
        return i8nHelper.instance;
    }

    constructor ()
    {
        //Temporalmente cogemos el Dictionary (en web tedrá que ser o una inyección o una petición)
        
    }

    public Load(dictionary:any)
    {
        this.dict = dictionary;
    }

    public SelectLang(lang:string)
    {
        this.lang = lang;
        if(typeof(this.dict[this.lang])!='undefined')
        {
            this.seldict = this.dict[this.lang];
        }
    }


    public Get(key:string,...rest:any[]) :string{
        
        if(typeof(this.seldict)!='undefined')
        {
            if(typeof(this.seldict[key])!='undefined')
            {
                if(rest.length==0)
                return this.seldict[key];
                //@TODO: queda hacer que se utilice tambien el tema del rest... pero no se 
                //si hace falta
            }
        }

        
        return key;
    }
}