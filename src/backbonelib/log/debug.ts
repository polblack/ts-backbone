export class debug{
    static allowedTags:string="all";
    static allowedTagsMod:string="all";
    public static mlog(mod:string,text:any)
    {
         if(debug.allowedTags=='none') return;
         
         if(( debug.allowedTags=='all')||(mod.match(debug.allowedTagsMod)))
         {
             console.log(mod);
             console.log(text);
         }
    }
    public static log(text:any)
    {

        if(typeof(text)=="string"){
            if(debug.allowedTags.length>0)
            {
                if(debug.allowedTags=='none') return;
                if(debug.allowedTags!='all')
                {

                    if(text.match(debug.allowedTags))
                    {
                        
                        console.log(text);
                    }
                    else return;
                }
                else{
                    console.log(text);
                }
            }
        }
        else{
            console.log(text);
        }
    }
    public static EnableTags(tags:string)
    {
        console.log("ENABLING TAGS ON LOG "+tags);
        if(tags=="all")
        {
            debug.allowedTags='all';
            debug.allowedTagsMod='all';
        }
        else if(tags=="none"){
            debug.allowedTags='none';
            debug.allowedTagsMod='none';
        }
        else{
            
            debug.allowedTags="^("+tags.split(',').join('|')+").*?:";
            debug.allowedTagsMod="^("+tags.split(',').join('|')+")";
        }
        
    }
}