export class ConversionFunctions {
    constructor() {}

    public convertfromFtoC(value: string): string {
        console.log("activating f to c");
        return ((parseFloat(value) - 32) * 5/9).toString();
    }
    
    public convertfromFtoK(value: string): string {
        let num = ((parseFloat(value) - 32) * 5/9 + 273.15);
        console.log("activating f to k");
        return num.toString();
    }

    public convertfromCtoF(value: string): string {
        console.log("activating c to f");
        return ((parseFloat(value) * 9/5) + 32).toString();
    }

     public convertfromKtoF(value: string): string {
        let num = ((parseFloat(value) - 273.15) * 9/5 + 32);
        console.log("activating k to f");
        return num.toString();
    }

}