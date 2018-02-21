
export interface componentparams{
    template?:string,
    templateUrl?:any,
    selector:string,
    components?: any[]
}

/**
 * Clase de componente independiente, que genera un componente no asociado al component.factory
 */
export interface ComponentOptions{
    selector?:string,
    data?:any,
    template?:string,
    templateUrl?:string,
    modelUrl?:string
}

