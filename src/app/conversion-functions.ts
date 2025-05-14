export class ConversionFunctions {
    constructor() {}

    public convertfromFtoC(value: string): string {
        return ((Number(value) - 32) * 5/9).toString();
    }

    public convertfromCtoK(value: string): string {
        return (Number(value) + 273.15).toString();
    }

    public convertfromCtoF(value: string): string {
        return Math.round((Number(value) * 9/5) + 32).toString();
    }

    public convertfromKtoC(value: string): string {
        return (Number(value) - 273.15).toString();
    }

}