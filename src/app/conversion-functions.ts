export class ConversionFunctions {
    constructor() {}

    public convertfromFtoC(value: string): string {
        return ((parseFloat(value) - 32) * 5/9).toString();
    }
    
    public convertfromFtoK(value: string): string {
        let num = ((parseFloat(value) - 32) * 5/9 + 273.15);
        return num.toString();
    }

    public convertfromCtoF(value: string): string {
        return ((parseFloat(value) * 9/5) + 32).toString();
    }

     public convertfromKtoF(value: string): string {
        let num = ((parseFloat(value) - 273.15) * 9/5 + 32);
        return num.toString();
    }

}