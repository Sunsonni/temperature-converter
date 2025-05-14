export class ConversionFunctions {
    constructor() {}

    public convertfromFtoC(hiddenTemp: string): string {
        return ((parseFloat(hiddenTemp) - 32) * 5/9).toString();
    }

    public convertfromCtoK(value: string): string {
        console.log("activating c to k");
        return (parseFloat(value) + 273.15).toString();
    }

    public convertfromCtoF(value: string): string {
        console.log("activating c to f");
        return ((parseFloat(value) * 9/5) + 32).toString();
    }

    public convertfromKtoC(value: string): string {
        let num =  (parseFloat(value) - 273.15).toString();
        console.log("activating k to c");
        return num;
    }

    public convertfromFtoK(value: string): string {
        let num = ((parseFloat(value) - 32) * 5/9 + 273.15);
        console.log("activating f to k");
        return num.toString();
    }

     public convertfromKtoF(value: string): string {
        let num = ((parseFloat(value) - 273.15) * 9/5 + 32);
        console.log("activating k to f");
        return num.toString();
    }

}