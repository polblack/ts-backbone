/**
 * @desc : Wrapper para la consola del navegador.
 *          Evita que los mensajes de consola aparezcan si se desea
 * 
 */

export class NavigatorConsole{

    
    static oldConsoleLog=null;

    /**
     * Generamos una consola diferente
     */
     

    public static Enable(enable:boolean):void{
        if(enable)
        {
            if(NavigatorConsole.oldConsoleLog == null)
            return;
            window['console']['log'] = NavigatorConsole.oldConsoleLog;
        }
        else{
            NavigatorConsole.oldConsoleLog = console.log;
            window['console']['log'] = function() {return false;};
        }
    }
    


}

